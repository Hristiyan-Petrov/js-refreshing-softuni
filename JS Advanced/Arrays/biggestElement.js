function findBiggest(matrix) {

    let result = matrix
        .map(row => Math.max(...row))
        .reduce((acc, n) => {
           return Math.max(acc, n);
        }, Number.MIN_SAFE_INTEGER)

    console.log(result);

}

findBiggest(
    [[20, 50, 10],

    [8, 33, 145]]
)