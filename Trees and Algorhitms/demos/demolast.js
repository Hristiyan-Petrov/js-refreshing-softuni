// Sample code to read input and write output:

/*
function main(input) 
{
    process.stdout.write("Hello " + input);  // Write output to STDOUT
}
process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function (input) 
{
        stdin_input += input;   // Read input from STDIN
});

process.stdin.on("end", function () 
{
        main(stdin_input);
});

*/

// Warning: Printing unwanted or ill-formatted 
// data to output will cause the test cases to fail

function main(input) {
    const lines = input.split('\n');
    const [numSatellite, constX] = lines[0].split(' ').map(Number);
    const maxSatellites = Number(lines[lines.length - 1]);
    const children = Array(numSatellite).fill(null).map(() => []);
    
    for (let i = 1; i < numSatellite; i++) {
        const [parent, child] = lines[i].split(' ').map(Number);
        children[parent].push(child);
    }

    let queue = [0];
    let totalIterations = -1;

    while (queue.length > 0) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            const satellite = queue.shift();
            queue = queue.concat(children[satellite]);
        }
        totalIterations++;
    }

    return String(Math.ceil(totalIterations / maxSatellites));
}

const fs = require('fs');
fs.readFile('demos/inputFile.txt', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(main(data));
});

// process.stdin.resume();
// process.stdin.setEncoding("utf-8");
// var stdin_input = "";

// process.stdin.on("data", function (input) {
//     stdin_input += input;   // Read input from STDIN
// });

// process.stdin.on("end", function () {
//     main(stdin_input);
// });