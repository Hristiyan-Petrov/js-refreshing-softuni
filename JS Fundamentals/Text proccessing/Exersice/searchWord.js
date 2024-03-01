function searchWord(word, text) {

    text = text.split(' ');
    for (let item of text) {
        if (item.toLowerCase() === word.toLowerCase()) {
            console.log(word);
            return;
        }
    }
    console.log(word + ' not found!')
    // text.toLowerCase().includes(word.toLowerCase()) ? console.log(word) : console.log(word + ' not found!');
}

searchWord('JavaScript',
    'JavaScrip is the best programming language'
)