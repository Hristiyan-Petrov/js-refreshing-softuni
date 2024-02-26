function solve(input) {
    let result = input.splice(0, 2);
    const recentCount = 2;

    // Check if there are initial 2 numbers to start operating with
    if (typeof result[1] !== 'number') {
        handleError('not enough operands');
        return;
    }


    for (let element of input) {
        if (typeof element === 'number') { // If next element in input is  a number - add it to the result sequence which is all numbers collected
            result.push(element);
        } else { // In other case do the calculation of last {recentCount} elements in sequence

            if (result.length > 1) { // If result sequence doesn't have enough numbers to operate with => log error
                let operand = element;
                let operationResult = operation(operand); // the function returns the result of last 2 numbers in arr calculated by the operand && deletes them
                result.push(operationResult); // add the new number after calculation onsted of last {recentCount} numbers
            } else {
                handleError('not enough operands');
            }

        }
    }

    if (result.length == 1) {
        console.log(result.join(' '));
    } else {
        handleError('too many operands');
    }

    function operation(operand) {
        let [num1, num2] = result.splice(result.length - recentCount, recentCount);

        switch (operand) {
            case '+':
                return num1 + num2;

            case '-':
                return num1 - num2;

            case '*':
                return num1 * num2;

            case '/':
                return num1 / num2;
        }
    }

    function handleError(message) {
        console.log('Error: ' + message + '!');
    }
}

solve(
    [15,
        '/']


)   