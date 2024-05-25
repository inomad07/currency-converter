import { calculateCurrencyWithNBKRRates } from './utils/calculateCurrencyWithNBKRRates.mjs';
import { calculateCurrencyByProvidedRates } from './utils/calculateCurrencyByProvidedRates.mjs';
import prompt from './utils/prompt.mjs';

const YES_OPTION = 'y';

function main() {
    console.log('Welcome to the KG Som converter App')

    const hasNBKRCurrencyRatesStringOption = prompt('Use currency rates of NBKR? Y/n: ');

    hasNBKRCurrencyRatesStringOption.toLowerCase() === YES_OPTION ? calculateCurrencyWithNBKRRates() : calculateCurrencyByProvidedRates();
}

main();
