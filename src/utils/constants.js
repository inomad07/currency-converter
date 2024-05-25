const currencyRatesURL = 'https://www.nbkr.kg/XML/daily.xml';

const filePath = 'currency_rates.txt';

const currencyNames = ['USD', 'EUR', 'KZT', 'RUB'];
const nominal = 1;

module.exports = {
    filePath,
    currencyRatesURL,
    currencyNames,
    nominal
}