function censor(text, censorWord) {

    while (text.includes(censorWord)) {
        text = text.replace(censorWord, '*'.repeat(censorWord.length));
    }
    console.log(text);
}

censor("A small sentence with small words", "small");