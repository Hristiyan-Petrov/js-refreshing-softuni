// Partial application usage

// the big function
function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

// the Partial application - this is a type of function that is based on a more complex one, but pre setting some of the expected agrs. This is done for code reuse.
// separator: ","
// symbol: "$"
// symbolFirst: true
function result(func) {
    return func.bind(null, ',', '$', true);
}

// the shorter variant 
// let result = func => func.bind(null, ',', '$', true);

let dollarFormatter = result(currencyFormatter);
console.log(dollarFormatter(5345));   // $ 5345,00
console.log(dollarFormatter(3.1429)); // $ 3,14
console.log(dollarFormatter(2.709));  // $ 2,71
