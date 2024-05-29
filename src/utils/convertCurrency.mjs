import { prepareNumber } from "./currency.mjs";
import { DEFAULT_CURRENCY } from "../constants/index.mjs";

function calculateTargetCurrencyToDefaultCurrency(exchangeRate, sourceCurrencyAmount) {
  return exchangeRate * sourceCurrencyAmount;
}

function calculateDefaultCurrencyToTargetCurrency(exchangeRate, sourceCurrencyAmount) {
  return parseFloat((sourceCurrencyAmount / exchangeRate).toFixed(2))
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

