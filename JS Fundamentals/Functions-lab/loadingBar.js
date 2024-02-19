let loadVisualize = n => createBar(n);
let createBar = n => `[${'%'.repeat(n / 10)}${'.'.repeat(10 - n / 10)}]`; 

let result = loadVisualize(85);
console.log(loadVisualize(80));