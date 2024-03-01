function removeOccurences(occurance, word) {

    while (word.includes(occurance)) {
        word = word.replace(occurance, '');
    }
    console.log(word);

}

removeOccurences('ice', 'kicegiciceeb');