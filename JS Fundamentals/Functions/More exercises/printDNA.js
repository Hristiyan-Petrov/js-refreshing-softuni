function printDNA(input) {
    let sequence = 'ATCGTTAGGG'.split('');
    let sequenceCounter = 0;

    for (let i = 1; i <= input; i++) {

        // If the current iteration is greater than 5, reset the index to 2, the algorhitm requires it
        if (i > 5) {
            i = setIndex();
        }

        let [el1, el2] = getElements(sequence);

        if (i % 2 === 0) {
            console.log(`*${el1}--${el2}*`);
        } else if (i % 3 === 0) {
            console.log(`${el1}----${el2}`);
        } else {
            console.log(`**${el1}${el2}**`);
        }

        // If the sequence counter is greater than or equal to the length of the sequence minus 2, reset the sequence counter to 0 so it can start from beggining
        if (sequenceCounter >= sequence.length - 2) {
            sequenceCounter = 0;
        } else {
            sequenceCounter += 2;
        }
    }

    function getElements(sequence) {
        return sequence.slice(sequenceCounter, sequenceCounter + 2); // retuns array
    }

    function setIndex() {
        input -= 4;
        return 2;
    }
}

printDNA(10);


// } else if (i === 4) {
//     console.log(`*${el1}--${el2}*`);

// } else if (i === 5) {
//     console.log(`**${el1}${el2}**`);