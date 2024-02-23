function printDNA(input) {
    let sequence = 'ATCGTTAGGG'.split('');
    let sequenceCounter = 0;

    for (let i = 1; i <= input; i++) {
        // let [el1, el2] = 



        let result = sequence.slice(sequenceCounter, sequenceCounter + 2);
        let [el1, el2] = result;

        if (i % 2 === 0) {
            console.log(`*${el1}--${el2}*`);
        } else if (i % 3 === 0) {
            console.log(`${el1}----${el2}`);
        } else {
            console.log(`**${el1}${el2}**`);
        }

        if (sequenceCounter >= sequence.length - 2) {
            sequenceCounter = 0;
        } else {
            sequenceCounter += 2;
        }
    }
}

printDNA(10);


// } else if (i === 4) {
//     console.log(`*${el1}--${el2}*`);

// } else if (i === 5) {
//     console.log(`**${el1}${el2}**`);