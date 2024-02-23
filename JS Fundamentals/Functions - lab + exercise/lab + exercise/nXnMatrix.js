function createMatrix(number) {
    let result = '';

    
    for (let i = 0; i < number; i++) {
        for (let i = 0; i <= number; i++) {
            if (i === number) {
                result = startNewLine(result);
                break;
            }
            // result += `${number} `;
            result = addInteger(result, number);
        }
    }
    
    return result;
}

let addInteger = (input, n) => input += `${n} `;

let startNewLine = function(input) {
    return input += '\n';
}

let nXnMatrix = createMatrix(3);
console.log(nXnMatrix);