let findResult = (a, b) => {
    return findFactorial(a) / findFactorial(b);
}

let findFactorial = n => n <= 1 ? 1 : n * findFactorial(n - 1);


// let findFactorial = n => {
//     let result = 1;

//     for (let i = 1; i <= n; i++) {
//         result *= i;
//     }

//     return result;
// }

console.log(findResult(5, 2));