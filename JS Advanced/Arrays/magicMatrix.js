function isMagicMatrix(matrix) {

    let rowsSum = findRowsSum(matrix);

    if (!rowsSum) {
        console.log(rowsSum);
        return;
    }

    let columnsSum = findColumnsSum(matrix);

    if (!columnsSum) {
        console.log(columnsSum);
        return;
    }

    console.log(rowsSum === columnsSum);

    function findRowsSum(matrix) {
        let result = matrix[0].reduce((a, b) => a + b);;

        for (let row of matrix) {
            let currSum = row.reduce((a, b) => a + b);
            if (currSum !== result) {
                result = false;
                break;
            }
        }

        return result;
    }

    function findColumnsSum(matrix) {
        let result = matrix.map(x => x[0]).reduce((a, b) => a + b);
        // .reduce((a, b) => a + b)

        for (let i = 1; i < matrix.length; i++) {
            let currentSum = matrix.map(x => x[i]).reduce((a, b) => a + b);

            if (result !== currentSum) {
                result = false;
                break;
            }
        }

        return result;
    }
}
let matrix = isMagicMatrix(
    [[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]

)