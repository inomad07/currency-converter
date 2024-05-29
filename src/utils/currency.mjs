import { CURRENCY_NAMES } from '../constants/index.mjs';

export function findCurrency(name) {
  return CURRENCY_NAMES.includes(name);
}

export function findCurrencyByCode(currencies, currencyCode) {
  return currencies.find(({ ISOCode }) => ISOCode === currencyCode);
}

export function getAvailableCurrencyCodes() {
  return CURRENCY_NAMES.join('/');
}

export function replaceCommasWithDots(stringAmount) {
  return stringAmount.replace(',', '.');
}

export function prepareNumber(stringifiedNumber) {
  parseFloat(replaceCommasWithDots(stringifiedNumber))
}
