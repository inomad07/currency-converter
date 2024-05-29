import prompt from './prompt.mjs';
import { convertTargetCurrency } from './convertCurrency.mjs';
import { fetchAndParseXmlData } from '../services/currencyRatesNBKR.mjs';
import { findCurrency, getAvailableCurrencyCodes, findCurrencyByCode } from './currency.mjs';
import { CURRENCY_RATES_NBKR_URL, DEFAULT_CURRENCY, CURRENCY_CODE_MESSAGE, CURRENCY_AMOUNT_MESSAGE, DEFAULT_CURRENCY_AMOUNT_MESSAGE, YES_OPTION, DEFAULT_CURRENCY_CODE_MESSAGE } from '../constants/index.mjs';

export async function calculateCurrencyWithNBKRRates() {
  console.log(`Choose your target currency ${getAvailableCurrencyCodes()}: `);

  const defaultCurrency = prompt(DEFAULT_CURRENCY_CODE_MESSAGE).toUpperCase();
  const { currencies } = await fetchAndParseXmlData(CURRENCY_RATES_NBKR_URL);

  defaultCurrency === YES_OPTION ? calculateToDefaultCurrency(currencies): calculateByGivenCurrency(currencies);
}

function calculateToDefaultCurrency(currencies) {
  const {
    sourceCurrencyAmount,
    exchangeRate
  } = getCurrencyRatesInput(currencies, CURRENCY_AMOUNT_MESSAGE)

  const targetCurrencyAmount = convertTargetCurrency({
    sourceCurrencyAmount,
    exchangeRate,
    currencyCode: DEFAULT_CURRENCY 
  });

  console.log('Result: ', targetCurrencyAmount, DEFAULT_CURRENCY)
}

function getCurrencyRatesInput(currencies, currencyAmountMsg) {
  const currencyCode = prompt(CURRENCY_CODE_MESSAGE).toUpperCase();
  const currencyAmount = prompt(currencyAmountMsg);

  const isValidCurrency = findCurrency(currencyCode);
  const { rate } = findCurrencyByCode(currencies, currencyCode);

  if (!isValidCurrency) {
    console.log('Currency not found in DB!');
    return;
  }

  return {
    sourceCurrencyAmount: currencyAmount,
    exchangeRate: rate, 
    currencyCode
  }
}

function calculateByGivenCurrency(currencies) {
  const {
    sourceCurrencyAmount,
    exchangeRate,
    currencyCode
  } = getCurrencyRatesInput(currencies, DEFAULT_CURRENCY_AMOUNT_MESSAGE)

  const targetCurrencyAmount = convertTargetCurrency({
    exchangeRate,
    sourceCurrencyAmount,
    currencyCode
  });

  console.log('Result: ', targetCurrencyAmount, currencyCode)
}
