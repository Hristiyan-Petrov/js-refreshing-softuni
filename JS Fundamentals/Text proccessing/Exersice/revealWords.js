function revealWords(replaceWords, text) {

    replaceWords = replaceWords.split(', ');

    for (let word of replaceWords) {
        // let starred = '*'.repeat(word.length);
        text = text.replace('*'.repeat(word.length), word);
    }

    console.log(text);
}

revealWords(
    'great, learning',
    'softuni is ***** place for ******** new programming languages'
);