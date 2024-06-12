import prompt from './prompt.mjs';
import { DEFAULT_NOMINAL, DEFAULT_CURRENCY, DEFAULT_CURRENCY_AMOUNT_MESSAGE, CURRENCY_CODE_MESSAGE, CURRENCY_AMOUNT_MESSAGE, CURRENCY_EXCHANGE_RATE_MESSAGE, YES_OPTION, DEFAULT_CURRENCY_CODE_MESSAGE } from '../constants/index.mjs';
import { convertTargetCurrency } from './convertCurrency.mjs';
import { getAvailableCurrencyCodes } from './currency.mjs';

export function calculateCurrencyByProvidedRates() {
  console.log(`Default nominal is: ${DEFAULT_NOMINAL}`);
  console.log(`Currency converter uses ${getAvailableCurrencyCodes()} currencies`);

  const defaultCurrency = prompt(DEFAULT_CURRENCY_CODE_MESSAGE).toUpperCase();
  defaultCurrency ===  YES_OPTION ? calculateToDefaultCurrency() : calculateToTargetCurrency();
}

function getProvidedCurrencyInput(currencyAmountMsg) {
  const exchangeRate = prompt(CURRENCY_EXCHANGE_RATE_MESSAGE);
  const sourceCurrencyAmount = prompt(currencyAmountMsg);

  return {
    exchangeRate,
    sourceCurrencyAmount
  }
}

function calculateToDefaultCurrency() {
  const { exchangeRate,sourceCurrencyAmount } = getProvidedCurrencyInput(CURRENCY_AMOUNT_MESSAGE);
  console.log('Result: ', convertTargetCurrency({exchangeRate, sourceCurrencyAmount, currencyCode: DEFAULT_CURRENCY}), DEFAULT_CURRENCY);
}

function calculateToTargetCurrency() {
  const currencyCode = prompt(CURRENCY_CODE_MESSAGE).toUpperCase();
  const { exchangeRate, sourceCurrencyAmount } = getProvidedCurrencyInput(DEFAULT_CURRENCY_AMOUNT_MESSAGE)
  console.log('Result: ', convertTargetCurrency({exchangeRate, sourceCurrencyAmount, currencyCode}), currencyCode);
}
