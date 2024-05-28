import prompt from './prompt.mjs';
import { convertAmountToTargetCurrency } from './convertCurrency.mjs';
import { fetchAndParseXmlData } from './fetchCurrency.mjs';
import { findCurrency, getAvailableCurrencyCodes } from './currency.mjs';
import { CURRENCY_RATES_URL, TARGET_CURRENCY, CURRENCY_CODE_MESSAGE, CURRENCY_AMOUNT_MESSAGE } from '../constants.mjs';

function findCurrencyByCode(currencies, currencyCode) {
  return currencies.find(({ ISOCode }) => ISOCode === currencyCode);
}

export async function calculateCurrencyWithNBKRRates() {
  console.log(`Choose your target currency ${getAvailableCurrencyCodes()}: `);

  const currencyCode = prompt(CURRENCY_CODE_MESSAGE).toUpperCase();
  const currencyAmount = prompt(CURRENCY_AMOUNT_MESSAGE);
  const isValidCurrency = findCurrency(currencyCode);

  if (!isValidCurrency) {
    console.log('Currency not found in DB!');
    return;
  }

  const { currencies } = await fetchAndParseXmlData(CURRENCY_RATES_URL);

  const { nominal, rate } = findCurrencyByCode(currencies, currencyCode);
  const targetCurrencyAmount = convertAmountToTargetCurrency({
    sourceCurrencyAmount: currencyAmount,
    sourceCurrencyNominal: nominal,
    exchangeRate: rate
  });

  console.log('Result: ', targetCurrencyAmount, TARGET_CURRENCY)
}
