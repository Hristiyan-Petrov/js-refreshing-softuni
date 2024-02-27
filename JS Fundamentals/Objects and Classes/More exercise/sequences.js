function solve(input) {
    let sequence = [];

    for (let array of input) {
        array = JSON.parse(array);
        if (isUnique(array)) {
            sequence.push(array);
        }
    }


    sequence = sequence.sort((a, b) => a.length - b.length);

    for (let arr of sequence) {
        console.log(`[${arr.join(', ')}]`);
    }


    function isUnique(arr) {
        for (let array of sequence) {
            
            // Compare  the current array with every other array in the sequence
            // Using JSON stringify to convert the arrays into strings so we can compare them, that is needed because they are different references 
            if (JSON.stringify(array.sort(sortDescending)) == JSON.stringify(arr.sort(sortDescending))) {
                return false;
            }
        }
        return true;
    }

    function sortDescending(a, b) {
        return b - a;
    }
}

solve([
    "[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"
])