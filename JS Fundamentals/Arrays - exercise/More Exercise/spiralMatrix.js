// function solve(rows, cols) {
//     let result = [];
//     for (let i = 0; i < rows; i++) {
//         result.push([]);
//     }

//     let counter = 1;

//     // let firstRow = [];

//     // for (let i = 0; i < rows; i++) {
//     //     firstRow[i] = counter;
//     //     counter++;
//     // }

//     // result[0] = firstRow;

//     console.log(result);
//     let isRowForwards = true;
//     let isColDownwards = false;
//     let isRowBackwards = false;
//     let isColUpwards = false;
//     let spaces = 0;


//     for (let i = 0; i < Math.round(rows * 1.8); i++) {

//         if (isRowForwards) {
//             for (let j = i - 1; j < rows; j++) {
//                 result[i][j] = counter;
//                 counter++;
//             }

//             isRowForwards = false;
//             isColDownwards = true;

//         } else if (isColDownwards) {
//             for (let j = i; j < cols; j++) {
//                 result[j][rows - i] = counter;
//                 counter++
//             }
//             isColDownwards = false;
//             isRowUpwards = true;
//             spaces++;
//             console.log(result);

//         } else if (isRowUpwards) {
//             for (let j = cols - i / 2; j > 0; j--) {
//                 result[cols - i / 2][j - i / 2] = counter;
//                 counter++;
//             }
//             isRowUpwards = false;
//             isColUpwards = true;

//         } else if (isColUpwards) {
//             for (let j = rows - Math.round(i / 2) - spaces; j > spaces ;j--) {
//                 result[rows - j / 2 - spaces][j - i / 2] = counter;
//                 counter++;
//             }

//             isColUpwards = false;
//             isRowForwards = true;
//         }


//     }

// }

function generateSpiralMatrix(rows, cols) {
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
    let num = 1;
    let rowStart = 0;
    let rowEnd = rows - 1;
    let colStart = 0;
    let colEnd = cols - 1;

    while (rowStart <= rowEnd && colStart <= colEnd) {
        // Traverse right
        for (let col = colStart; col <= colEnd; col++) {
            matrix[rowStart][col] = num++;
        }
        rowStart++;

        // Traverse down
        for (let row = rowStart; row <= rowEnd; row++) {
            matrix[row][colEnd] = num++;
        }
        colEnd--;

        // Traverse left
        for (let col = colEnd; col >= colStart; col--) {
            matrix[rowEnd][col] = num++;
        }
        rowEnd--;

        // Traverse up
        for (let row = rowEnd; row >= rowStart; row--) {
            matrix[row][colStart] = num++;
        }
        colStart++;
    }

    console.log(matrix);
}

generateSpiralMatrix(5, 5);
