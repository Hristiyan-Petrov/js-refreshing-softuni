function solve(input) {
    let wordsCounter = {};

    for (let word of input) {
        if (!wordsCounter[word]) {
            wordsCounter[word] = 1;
        } else {
            wordsCounter[word]++;
        }
    }

    let sortedCounter = Array.from(Object.entries(wordsCounter)).sort(sortByCount);

    for (let [word, count] of sortedCounter) {
        console.log(`${word} -> ${count} times`);
    }

    function sortByCount(a,b) {
        return b[1] - a[1];
    }
}

solve(["Here", "is", "the", "first", "sentence", "Here", "is", "another", "sentence", "And", "finally", "the", "third", "sentence"])