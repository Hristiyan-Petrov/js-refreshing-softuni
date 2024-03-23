function countWords(input) {
    let text = input[0];
    let words = text.match(/\b\w+\b/g);
    let wordsCount = {};

    for(let word of words) {
        wordsCount[word] ? wordsCount[word]++ : wordsCount[word] = 1;
    }

    console.log(JSON.stringify(wordsCount));
}

countWords(
    ['JS devs use Node.js for server-side JS.-- JS for devs']
);