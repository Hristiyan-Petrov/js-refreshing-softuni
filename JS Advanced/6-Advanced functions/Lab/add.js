// Closure usage

function solution(n) {
    let initial = n;

    return n => initial + n;
    
    // they are the same
    // return function(n) {
    //     return initial + n;
    // }
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));