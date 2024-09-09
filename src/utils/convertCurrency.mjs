import { prepareNumber, formatNumberPrecision } from "./currency.mjs";
import { DEFAULT_CURRENCY } from "../constants/index.mjs";

function calculateTargetCurrencyToDefaultCurrency(exchangeRate, sourceCurrencyAmount) {
  return formatNumberPrecision(exchangeRate * sourceCurrencyAmount);
}

function calculateDefaultCurrencyToTargetCurrency(exchangeRate, sourceCurrencyAmount) {
  return formatNumberPrecision(sourceCurrencyAmount / exchangeRate)
}

export function convertTargetCurrency({ exchangeRate, sourceCurrencyAmount, currencyCode }) {
  const preparedExchangeRate = prepareNumber(exchangeRate);
  const preparedSourceCurrencyAmount = prepareNumber(sourceCurrencyAmount);

  return currencyCode == DEFAULT_CURRENCY ? calculateTargetCurrencyToDefaultCurrency(
    preparedExchangeRate,
    preparedSourceCurrencyAmount
  ): calculateDefaultCurrencyToTargetCurrency(
    preparedExchangeRate,
    preparedSourceCurrencyAmount
  )
}
