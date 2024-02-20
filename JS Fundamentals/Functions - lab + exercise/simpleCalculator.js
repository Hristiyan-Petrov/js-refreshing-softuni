let calculate = function(a, b, operator) {
    let operation = null;

    switch (operator) {
        case 'multiply':
            operation = (a, b) => a * b;
            // return a * b;
            break;
        case 'devide':
            return a / b;
        case 'add':
            a + b;
        case 'subtract':
            return a - b;
    }

    let result = operation(a,b);
    return result;
}


console.log(calculate(5, 5, 'multiply'));