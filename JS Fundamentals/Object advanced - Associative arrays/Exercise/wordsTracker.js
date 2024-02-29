function solve(input) {
    let words = input.shift().split(' ');
    let wordsTracker = {};

    for (let word of words) {
        wordsTracker[word] = 0;
    }

    for (let word of input) {
        if (Object.keys(wordsTracker).includes(word)) {
            wordsTracker[word]++;
        }
    }

    wordsTracker = Array.from(Object.entries(wordsTracker))
        .sort((a, b) => b[1] - a[1])
        .forEach((kvp) => {
            console.log(`${kvp[0]} - ${kvp[1]}`);
    })
}

solve([
    'this sentence', 'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the', 'occurances', 'of', 'the'
    , 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task'
]
)