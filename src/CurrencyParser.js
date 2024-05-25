const axios = require('axios');
const { parseString } = require('xml2js');
const { promisify } = require('util');

const parseXmlString = promisify(parseString);

async function fetchXmlFromUrl(url) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error("Error fetching XML:", error);
        throw error;
    }
}

async function parseXmlUrlToObject(url) {
    try {
        const xmlData = await fetchXmlFromUrl(url);
        const objData = await parseXmlString(xmlData);
        return objData;
    } catch (error) {
        console.error("Error parsing XML to object:", error);
        throw error;
    }
}

async function formatXmlData(url) {
    try {
        const xmlData = await parseXmlUrlToObject(url);

        const currencyRates = xmlData.CurrencyRates;
        const title = currencyRates.$.Name;
        const date = currencyRates.$.Date;

        const currencies = currencyRates.Currency.map(currency => ({
            ISOCode: currency.$.ISOCode,
            nominal: currency.Nominal[0],
            value: currency.Value[0]
        }));

        const formattedData = {
            title,
            date,
            currencies
        };
        return formattedData;
    } catch (error) {
        console.error("Error formatting XML data:", error);
        throw error;
    }
}

module.exports = {
    formatXmlData
}