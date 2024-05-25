import prompt from './prompt.mjs';
import { convertAmountToTargetCurrency } from './convertCurrency.mjs';
import { fetchAndParseXmlData } from './fetchCurrency.mjs';
import { findCurrency, getAvailableCurrencyCodes } from './currency.mjs';
import { CURRENCY_RATES_URL } from '../constants.mjs';

function findCurrencyByCode(currencies, currencyCode) {
  return currencies.find(({ ISOCode }) => ISOCode === currencyCode);
}

export async function calculateCurrencyWithNBKRRates() {
  console.log(`Choose your target currency ${getAvailableCurrencyCodes()}: `);

  const currencyCode = prompt('Enter your currency code: ').toUpperCase();
  const currencyAmount = prompt('Enter your currency amount: ');
  const isValidCurrency = findCurrency(currencyCode);

  if (!isValidCurrency) {
    console.log('Currency not found in DB!');
    return;
  }

  const { currencies } = await fetchAndParseXmlData(CURRENCY_RATES_URL);

  const { nominal, value } = findCurrencyByCode(currencies, currencyCode);
  const targetCurrencyAmount = convertAmountToTargetCurrency({
    sourceCurrencyAmount: currencyAmount,
    sourceCurrencyNominal: nominal,
    exchangeRate: value
  });

  console.log('Result: ', targetCurrencyAmount, 'Som')
}
