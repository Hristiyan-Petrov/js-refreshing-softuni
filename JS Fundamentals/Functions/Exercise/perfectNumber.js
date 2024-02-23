let solve = function(number) {
    let divisors = findProperPositiveDivisors(number);
    let isPerfect = checkAliquotSum(divisors, number);

    if (isPerfect) {
        return 'We have a perfect number!';
    } else {
        return 'Not so perfect...'
    }
    
}

let findProperPositiveDivisors = n => {
    let result = [];

    for (let i = 1; i < n; i++) {
        if (n % i === 0) {
            result[result.length] = i;
        }
    }
    return result;
}

let checkAliquotSum = function(array, n) {
    let sum = 0;

    for (let element of array) {
        sum += element;
    }

    return sum === n;
}

let result = solve(496);
console.log(result);