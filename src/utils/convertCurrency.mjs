function replaceCommasWithDots(stringAmount) {
  return stringAmount.replace(',', '.');
}

export function calculateTargetCurrencyAmount(sourceCurrencyNominal, exchangeRate, sourceCurrencyAmount) {
  if (!sourceCurrencyNominal && !exchangeRate) return null;
  if (!sourceCurrencyNominal && !sourceCurrencyAmount) return sourceCurrencyNominal * exchangeRate;

  return exchangeRate * sourceCurrencyAmount;
}

export function convertAmountToTargetCurrency({ sourceCurrencyNominal, exchangeRate, sourceCurrencyAmount }) {
  return calculateTargetCurrencyAmount(
    sourceCurrencyNominal,
    parseFloat(replaceCommasWithDots(exchangeRate)),
    parseFloat(replaceCommasWithDots(sourceCurrencyAmount))
  );
}
