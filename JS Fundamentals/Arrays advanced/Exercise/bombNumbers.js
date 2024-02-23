let detonate = function(sequence, bomb) {
    let bombingNumber = bomb.shift();
    let bombPower = bomb.shift();

    for (let i in sequence) {
        if (sequence[i] === bombingNumber) { // When detected bombingNumber
            sequence.splice(i - bombPower, (bombPower) * 2 + 1); // Use splice to remove the current element and the surrounding elements within the range of the bomb power
        }
    }

    return sequence.reduce((a,b) => a + b); // return the sum of the remaining elements in the sequence array
}

let result = detonate([1, 2, 2, 4, 2, 2, 2, 9],
    [4, 2]
    
);

console.log(result);
