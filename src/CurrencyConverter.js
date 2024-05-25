function calc(nominal, value, amount ) {
    if (!nominal && !value) return null;
    if (!nominal && !amount) return nominal * value;
    return value * amount
}

function convert(name, amount, { currencies }) {
    const currency = currencies.find(({ ISOCode }) => ISOCode === name);
    const { nominal, value } = currency;
    return calc(nominal, parseInt(value), parseInt(amount))
}


module.exports = {
    calc,
    convert
}
