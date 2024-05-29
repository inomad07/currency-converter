import { replaceCommasWithDots } from "./currency.mjs";
import { DEFAULT_CURRENCY } from "../constants/index.mjs";

function calculateTargetCurrencyToDefaultCurrency(exchangeRate, sourceCurrencyAmount) {
  return exchangeRate * sourceCurrencyAmount;
}

function calculateDefaultCurrencyToTargetCurrency(exchangeRate, sourceCurrencyAmount) {
  return parseFloat((sourceCurrencyAmount / exchangeRate).toFixed(2))
}

export function convertTargetCurrency({ exchangeRate, sourceCurrencyAmount, currencyCode }) {
  return currencyCode == DEFAULT_CURRENCY ? calculateTargetCurrencyToDefaultCurrency(
    parseFloat(replaceCommasWithDots(exchangeRate)),
    parseFloat(replaceCommasWithDots(sourceCurrencyAmount))
  ): calculateDefaultCurrencyToTargetCurrency(
    parseFloat(replaceCommasWithDots(exchangeRate)),
    parseFloat(replaceCommasWithDots(sourceCurrencyAmount))
  )
}

