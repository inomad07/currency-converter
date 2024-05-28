export function formatCurrencyDataFromXML({ CurrencyRates }) {
  const title = CurrencyRates.$.Name;
  const date = CurrencyRates.$.Date;

  const currencies = CurrencyRates.Currency.map(({ $: { ISOCode }, Nominal, Value }) => ({
      ISOCode,
      nominal: Nominal[0],
      rate: Value[0]
  }));

  return {
      title,
      date,
      currencies
  };
}
