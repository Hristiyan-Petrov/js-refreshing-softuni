function printNthElement(input) {
    let nthEl = Number(input.pop());
    let result = [];

    for (let i in input) {
        if (Number(i) % nthEl === 0) {
            result.push(input[i]);
        }
    }
    console.log(result.join(' '));

}

let result = printNthElement(
    ['1', '2', '3', '4', '5', '6'])
    ;