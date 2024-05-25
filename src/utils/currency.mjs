import { CURRENCY_NAMES } from '../constants.mjs';

export function findCurrency(name) {
  return CURRENCY_NAMES.includes(name);
}

export function getAvailableCurrencyCodes() {
  return CURRENCY_NAMES.join('/');
}