import prompt from './prompt.mjs';
import { DEFAULT_NOMINAL, TARGET_CURRENCY } from '../constants.mjs';
import { calculateTargetCurrencyAmount } from './convertCurrency.mjs';
import { getAvailableCurrencyCodes } from './currency.mjs';

export function calculateCurrencyByProvidedRates() {
  console.log(`Default nominal is: ${DEFAULT_NOMINAL}`);
  console.log(`Currency converter uses ${getAvailableCurrencyCodes()} currencies`);

  const exchangeRate = prompt('Enter your currency exchange rate: ');
  const currencyAmount = prompt('Enter your currency amount: ');

  console.log('Result: ', calculateTargetCurrencyAmount(DEFAULT_NOMINAL, exchangeRate, currencyAmount), TARGET_CURRENCY);
}
