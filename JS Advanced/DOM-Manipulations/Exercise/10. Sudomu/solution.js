function solve() {
    let table = document.querySelector('#exercise table');
    let resultField = document.querySelector('#check p');
    let [checkButton, clearButton] = document.querySelectorAll('#exercise tfoot button');
    checkButton.disabled = 'true';
    checkButton.style.color = 'gray';

    let tbodyElement = document.querySelector('#exercise tbody');
    let inputFields = tbodyElement.querySelectorAll('tr td input');
    tbodyElement.addEventListener('change', checkIsFull);// make check button available only when the cells are full

    checkButton.addEventListener('click', checkResult);

    clearButton.addEventListener('click', clearSudoku);

    function checkIsFull(e) {
        if (e.target.tagName !== 'INPUT') {
            return;
        }

        let isSudomuFull = Array.from(inputFields).every(cell => cell.value !== '');

        if (isSudomuFull) {
            checkButton.removeAttribute('disabled');
            checkButton.style.color = 'white';
        }
    }

    function checkResult(e) {
        let isWin = checkWin();

        if (isWin) {
            table.style.border = '2px solid green';
            resultField.textContent = 'You solved it! Congratulations!';
        } else {
            table.style.border = '2px solid red';
            resultField.textContent = 'NOP! You are not done yet…';
        }

        function checkWin() {
            let isWin = true;
            let matrix = createMatrix(inputFields);
            let firstRowSorted = matrix[0].sort((a, b) => a - b);

            if (firstRowSorted[0] === firstRowSorted[1]) { // solve the problem with whole sudoku filled with the same num
                return isWin = false;
            }

            for (let i = 0; i < matrix.length; i++) {
                let currColumn = createColumn(i).sort((a, b) => a - b);

                matrix[i]
                    .sort((a, b) => a - b)
                    .forEach((n, j, arr) => {
                        if (arr[j] !== firstRowSorted[j] || currColumn[j] !== firstRowSorted[j]) {
                            isWin = false;
                        }
                    });
            }

            return isWin;

            function createMatrix(inputs) {
                let matrix = [];
                for (let i = 0; i < inputs.length; i += 3) {
                    matrix.push(Array.from(inputs).map(x => x.value).slice(i, i + 3));
                }
                return matrix;
            }

            function createColumn(i) {
                let col = [];
                for (let j = 0; j < matrix.length; j++) {
                    col.push(matrix[i][j]);
                }
                return col;
            }
        }
    }

    function clearSudoku(e) {
        Array.from(inputFields).forEach(field => field.value = '');
        table.style.border = '';
        // table.removeAttribute('style')
        resultField.textContent = '';
    }
}