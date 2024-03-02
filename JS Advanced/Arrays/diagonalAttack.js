function attack(input, input1) {
    let createMatrix = input => {
        let matrix = [];

        input.forEach(row => {
            matrix.push(row
                .split(' ')
                .map(Number));
        });

        return matrix;
    }

    let isEqualSumDiagonals = matrix => {
        let firstDiagonal = 0;
        let secondDiagonal = 0;

        matrix.forEach((row, i) => {
            firstDiagonal += row[i];
            secondDiagonal += row[row.length - 1 - i];
        });

        return firstDiagonal === secondDiagonal ? firstDiagonal : false;
    }

    let printMatrix = matrix => {
        matrix.forEach(row => console.log(row.join(' ')));
    }

    let setOtherElementsToSum = (matrix, sum) => {
        matrix.forEach((row, i) => {
            row.forEach((n, j) => {
                if (j !== i && j !== matrix.length - 1 - i) {
                    row[j] = sum;
                }    
            });
        });
    }

    let matrix = createMatrix(input);    

    if (isEqualSumDiagonals(matrix)) {
        // set every element that is NOT part of the main diagonals to that sum
        setOtherElementsToSum(matrix, isEqualSumDiagonals(matrix));        
        printMatrix(matrix);
    } else {
        printMatrix(matrix);
    }
    
}

attack(
    ['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10', 
    '1 4 5 2 2',
    '5 22 33 11 1']
    )