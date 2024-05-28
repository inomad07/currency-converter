import { calculateCurrencyWithNBKRRates } from './utils/calculateCurrencyWithNBKRRates.mjs';
import { calculateCurrencyByProvidedRates } from './utils/calculateCurrencyByProvidedRates.mjs';
import { GREETING_MESSAGE, NBRK_CURRENCY_RATES_MESSAGE, YES_OPTION } from './constants.mjs';
import prompt from './utils/prompt.mjs';



function main() {
    console.log(GREETING_MESSAGE)

    const hasNBKRCurrencyRatesStringOption = prompt(NBRK_CURRENCY_RATES_MESSAGE);

    hasNBKRCurrencyRatesStringOption.toLowerCase() === YES_OPTION ? calculateCurrencyWithNBKRRates() : calculateCurrencyByProvidedRates();
}

main();
