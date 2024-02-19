function solve(a, b, c) {
    let sum = (a, b) => a + b;

    let subtract = function (sumResult, c) {
        return sumResult - c;
    };

    return subtract(sum(a, b), c);
}

console.log(solve(23,
    6,
    10

)); 