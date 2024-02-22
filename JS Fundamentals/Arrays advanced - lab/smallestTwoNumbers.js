let smallestXNumbers = (array, x) => {
    return array
        .sort((a, b) => a - b)
        .slice(0, x)
        .join(' -> ')

}

console.log(smallestXNumbers([30, 15, 10, 1], 3));