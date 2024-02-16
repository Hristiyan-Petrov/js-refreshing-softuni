// Because using node - type in terminal "node {path}"
const calculotor = require('./calculator');

let result1 = calculotor.sum(1, 2);

//Test #1
if (result1 === 3) {
    console.log('Test #1 successful!');
} else {
    console.log('Test #1 failed!');
}

//Test #2
let result2 = calculotor.sum(-1, 2);

if (result2 === 1) {
    console.log('Test #2 successful!');
} else {
    console.log('Test #2 failed!');
}