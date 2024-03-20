function getFibonacciNumber() {
    let current = 0;
    let next = 1;
  
    return function() {
        let temp = next;
        next = current + next;
        current = temp;
        return current;
    }
}

let fib = getFibonacciNumber();
console.log(fib());  // Output: 1
console.log(fib());  // Output: 1
console.log(fib());  // Output: 2
console.log(fib());  // Output: 3
console.log(fib());  // Output: 5
console.log(fib());
console.log(fib());
console.log(fib());