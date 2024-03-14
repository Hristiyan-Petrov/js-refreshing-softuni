function solve() {
    let expressionField = document.getElementById('expressionOutput');
    let resultField = document.getElementById('resultOutput');
    const operands = ['+', '-', '*', '/'];

    let buttons = document.querySelector('#calculator .keys').children;

    for (let button of buttons) {
        // Logic for  numbers and operands expect '='
        if (button.value !== '=') {

            button.addEventListener('click', () => {
                // Cannot start with an operator
                if (expressionField.innerHTML == '' && operands.includes(button.value)) {
                    alert('Start with a number!');
                    return;
                }

                // Cannot have 2 operands one after another
                else if (operands.includes(button.value) && operands.includes(expressionField.innerHTML[expressionField.innerHTML.length - 1])) {
                    alert('Please type number after operand!');
                    return;
                }

                expressionField.innerHTML += button.value;
                // console.log(expressionField.innerHTML[expressionField.innerHTML.length - 1]);
            });

        } else {
            button.addEventListener('click', () => {
                let expressionCharacersArray = expressionField.innerHTML.split('');
                let hasOneOperandAtLeast = expressionCharacersArray.some(x => operands.includes(x));
                let isNumLastChar = isNaN(expressionCharacersArray[expressionCharacersArray.length - 1]) ? false : true;

                if (hasOneOperandAtLeast && isNumLastChar) {
                    let result = calculate(expressionCharacersArray);
                    resultField.innerHTML = result;
                } else {
                    alert('Insert at least one operand and finish the line with number!');
                }
            });
        }
    }

    // Clear button
    let clearButton = document.querySelector('#calculator .top .clear');
    clearButton.addEventListener('click', function () {
        expressionField.innerHTML = '';
        resultField.innerHTML = '';
    });

    function calculate(arr) {
        let operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        };

        let result = '';
        let operator = '';
        let nextNumber = '';

        arr.forEach(item => {
            if (operators[item]) {
                // If the item is an operator, perform the calculation
                if (result && operator && nextNumber) {
                    result = operators[operator](Number(result), Number(nextNumber));
                    operator = item;
                    nextNumber = '';
                } else {
                    operator = item;
                }
            } else {
                if (!operator) {
                    // If the operator is not defined yet, append to result
                    result += item;
                } else {
                    // If the operator is defined, append to nextNumber
                    nextNumber += item;
                }
            }
        });

        // Perform the final calculation
        if (result && operator && nextNumber) {
            result = operators[operator](Number(result), Number(nextNumber));
        }

        return result;
    }

    // function calculate(array) {
    //     let operators = {
    //         '+': (a, b) => a + b,
    //         '-': (a, b) => a - b,
    //         '*': (a, b) => a * b,
    //         '/': (a, b) => a / b
    //     };
    //     let firstNum = '';

    //     function recursionCalculation(array) {
    //         if (array.length === 0) {
    //             return Number(firstNum);
    //         }

    //         for (let i = 0; i < array.length; i++) {
    //             let el = array[i];

    //             if (!isNaN(el)) {
    //                 firstNum += el;
    //                 continue;
    //             }

    //             let remainingArray = array.slice(i + 1);
    //             let result = recursionCalculation(remainingArray);

    //             return operators[el](Number(firstNum), result);
    //         }

    //         return Number(firstNum);
    //     }

    //     return recursionCalculation(array);
    // }

}