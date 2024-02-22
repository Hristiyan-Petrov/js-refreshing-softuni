function sort(numbers) {
    numbers = numbers.sort((a, b) => a - b);
    
    let result = [];

    while ( numbers.length > 0) {
        // let biggestNumber = numbers.splice((numbers.length - 1), 1);
        // let smallestNumber = numbers.splice(0, 1);
        // result.push(biggestNumber[0]);
        // result.push(smallestNumber[0]);

        result.push(numbers.pop());
        result.push(numbers.shift());
    }

    console.log(result);
}

sort([1, 21, 3, 52, 69, 63, 31, 2, 18, 94]);