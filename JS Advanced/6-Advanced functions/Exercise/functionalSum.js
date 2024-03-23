function add(num) {

    function sum(a) {
        num += a;
        return sum;
    }

    sum.toString = () => num;

    return sum;
}

// variant 2
function add(number) {
    let sum = number;

    function internalAdd(n) {
        sum += n;
        return internalAdd;
    }
    
    internalAdd.toString = function() { return sum; }

    return internalAdd;
}

// console.log(add(1));
console.log(add(1)(6)(-3));