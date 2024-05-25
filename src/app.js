const prompt = require('prompt-sync')({sigint: true});
const Redis = require('ioredis');
const { formatXmlData } = require('./CurrencyParser');
const { calc, convert } = require('./CurrencyConverter');
const { currencyRatesURL, currencyNames, nominal } = require('./utils/constants');


const client = new Redis();

client.on('error', (err) => {
    console.error('Redis client error:', err);
});

async function storeInRedis(key, data) {
    try {
        const result = await client.set(key, JSON.stringify(data));
        console.log('Data stored in Redis:', result);
        return result;
    } catch (err) {
        console.error('Error storing data in Redis:', err);
        throw err;
    }
}

let parsedCurrencies;


function findCurrency(name) {
    currencyNames.includes(name)
}

function autocCalc() {
    console.log("Choose your currency USD/EUR/KZT/RUB: ");
    let name = prompt('Enter your currency name: ');
    const amount = prompt('Enter your currency amount: ');
    name = name.toUpperCase();

    const isValid = findCurrency(name);
    setTimeout(async () => {
        await fetchCurrencyRates();
        // if (!isValid) {
        //     console.log('Currency not found in DB', isValid)
        //     return; 
        // } 
        const result = convert(name, amount, parsedCurrencies);
        console.log('Result: ', result, 'Som')
        console.log('Press CTRL + C to stop app: ')
    }, 2000);
}

const getInputData = () => {
    let automatic = prompt('Use currency rates of NBKR? Y/N: ');
    automatic = automatic.toLowerCase();
    automatic === 'y' ? autocCalc(): manualCalc();
};

function manualCalc() {
    console.log('Your nominal equal: 1')
    console.log('Currency converter uses USD/EUR/KZT/RUB currencies')
    const value = prompt('Enter your currency value: ');
    const amount = prompt('Enter your currency amount: ');
    const result = calc(nominal, value, amount)
    console.log('Result: ', result, 'Som')
    console.log('Press CTRL + C to stop app: ')
    return result
}


async function fetchCurrencyRates() {
    try {
        parsedCurrencies = await formatXmlData(currencyRatesURL);
        await storeInRedis('parsedCurrencies', parsedCurrencies);  
        // const serializedData = await client.get('parsedCurrencies');
        // const parsedData = JSON.parse(serializedData); 
        // console.log('parsed: ',parsedData) 
    } catch (error) {
        console.error("Error:", error);
    }
}


function main() {
    console.log('Welcome to the KG Som converter App')
    getInputData()
}


main();

