function findDiagonals(matrix) {
    let firstDiagonal = [];
    let secondDiagonal = [];

    matrix.forEach((row, i) => {
        firstDiagonal.push(row[i]);
        secondDiagonal.push(row[row.length - 1 -i]);
    });

    // for (let i = 0; i < matrix.length; i++) {
    //     firstDiagonal.push(matrix[i][i]);
    //     secondDiagonal.push(matrix[matrix.length - 1 - i][i]);
    // }

    console.log(firstDiagonal.reduce((acc, n) => acc + n), secondDiagonal.reduce((acc, n) => acc + n));
    // console.log(secondDiagonal.reduce((acc, n) => acc + n));
    
}

findDiagonals([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
])