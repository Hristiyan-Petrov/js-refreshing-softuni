// Write a function that takes 2 parameters (array and a function) that uses .reduce() to implement a simple version of .map().

function arrayMap(input, func) {
    return input.reduce(function(acc, curr) {
        acc.push(func(curr));
        return acc;
    }, []);
}

let nums = [1, 2, 3, 4, 5];
console.log(arrayMap(nums, (item) => item * 2)); // [ 2, 4, 6, 8, 10 ]

let letters = ["a", "b", "c"];
console.log(arrayMap(letters, (l) => l.toLocaleUpperCase())) // [ 'A', 'B', 'C' ]
