function isMagic(matrix) {

    let magic = true;
    let sum = matrix[0].reduce((acc, n) => acc + n, 0);;

    for (let i = 0; i < matrix.length; i++) {
        let currRowSum = matrix[i].reduce((acc, n) => acc + n, 0);
        // let currColumnSum = findColumntSum(i);
        let currColumnSum = matrix.reduce((acc, row) => acc + row[i], 0);

        if (currRowSum !== sum || currColumnSum !== sum) {
            magic = false;
            break;
        }
    }
    
    console.log(magic);
}

isMagic([[1, 0, 0], [0, 0, 1], [0, 1, 0]])