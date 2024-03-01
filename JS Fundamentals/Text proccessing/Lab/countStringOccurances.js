function countStringOccurances(text, searched) {
    let counnter = 0;
    text = text.split(' ');
    for (let word of text) {
        word === searched ? counnter++ : '';
    }
    console.log(counnter);
}

countStringOccurances(
    "This is a word and it also is a sentence",
    "is"
)