function extractOddOccurences(input) {

    let occurrances = {};

    for (let word of input.split(' ')) {
        if (!occurrances[word.toLowerCase()]) {
            occurrances[word.toLowerCase()] = 1;
        } else {
            occurrances[word.toLowerCase()] += 1;
        }
    }

    let result = [];

    for (let key of Array.from(Object.keys(occurrances))) {
        if (occurrances[key] % 2 !== 0) {
            result.push(key);
        }
    }

    console.log(result.join(' '));

    // let sorted = Array.from(Object.keys(occurrances))
    //     .filter(key => occurrances[key] % 2 !== 0)
    //     .join(' ')

    
    // console.log(sorted);
}

extractOddOccurences('Java C# Php PHP Java PhP 3 C# 3 1 5 C#');