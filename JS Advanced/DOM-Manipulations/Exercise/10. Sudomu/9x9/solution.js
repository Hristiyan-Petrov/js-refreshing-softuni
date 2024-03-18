function solve() {
    addGridLines();

    let table = document.querySelector('#exercise table');
    let resultField = document.querySelector('#check p');
    let [startButton, checkButton, clearButton, showButton] = document.querySelectorAll('#exercise tfoot button');
    handleDisablingOnButtons([checkButton, showButton, clearButton], true);

    let currentSolution = null; // Use it for later showing the solution with the check button
    let cells = Array.from(document.querySelectorAll('td > input'));

    let tbodyElement = document.querySelector('#exercise tbody');
    let inputFields = tbodyElement.querySelectorAll('tr td input');
    tbodyElement.addEventListener('change', () => { table.style.border = ''; });// make check button available only when the cells are full

    startButton.addEventListener('click', fillSudoku);

    checkButton.addEventListener('click', checkResult);

    clearButton.addEventListener('click', clearSudoku);

    showButton.addEventListener('click', showSolution);

    function fillSudoku(e) {
        if (e.target.textContent === 'Start new game') {
            clearSudoku();
        }

        let difficulty = document.getElementById('difficulty').value;


        // Set of pre-defined valid Sudoku solutions, and then choose randomly from these each time the function is called.
        // let sudokuSolutions = [
        //     [
        //         [5, 3, 4, 6, 7, 8, 9, 1, 2],
        //         [6, 7, 2, 1, 9, 5, 3, 4, 8],
        //         [1, 9, 8, 3, 4, 2, 5, 6, 7],
        //         [8, 5, 9, 7, 6, 1, 4, 2, 3],
        //         [4, 2, 6, 8, 5, 3, 7, 9, 1],
        //         [7, 1, 3, 9, 2, 4, 8, 5, 6],
        //         [9, 6, 1, 5, 3, 7, 2, 8, 4],
        //         [2, 8, 7, 4, 1, 9, 6, 3, 5],
        //         [3, 4, 5, 2, 8, 6, 1, 7, 9]
        //     ],
        //     [
        //         [3, 1, 6, 5, 7, 8, 4, 9, 2],
        //         [5, 2, 9, 1, 3, 4, 7, 6, 8],
        //         [4, 8, 7, 6, 2, 9, 5, 3, 1],
        //         [2, 6, 3, 4, 1, 5, 9, 8, 7],
        //         [9, 7, 4, 8, 6, 3, 1, 2, 5],
        //         [8, 5, 1, 7, 9, 2, 6, 4, 3],
        //         [1, 3, 8, 9, 4, 7, 2, 5, 6],
        //         [6, 9, 2, 3, 5, 1, 8, 7, 4],
        //         [7, 4, 5, 2, 8, 6, 3, 1, 9]
        //     ],
        //     [
        //         [8, 1, 2, 7, 5, 3, 6, 4, 9],
        //         [9, 4, 3, 6, 8, 2, 1, 7, 5],
        //         [6, 7, 5, 4, 9, 1, 2, 8, 3],
        //         [1, 5, 4, 2, 3, 7, 8, 9, 6],
        //         [3, 6, 9, 8, 4, 5, 7, 2, 1],
        //         [2, 8, 7, 1, 6, 9, 5, 3, 4],
        //         [5, 2, 1, 9, 7, 4, 3, 6, 8],
        //         [4, 3, 8, 5, 2, 6, 9, 1, 7],
        //         [7, 9, 6, 3, 1, 8, 4, 5, 2]
        //     ],
        //     [
        //         [6, 4, 2, 1, 5, 9, 3, 7, 8],
        //         [1, 3, 8, 6, 7, 2, 9, 5, 4],
        //         [7, 5, 9, 3, 4, 8, 6, 2, 1],
        //         [8, 2, 5, 7, 1, 3, 4, 9, 6],
        //         [4, 9, 1, 8, 6, 5, 7, 3, 2],
        //         [3, 7, 6, 9, 2, 4, 5, 8, 1],
        //         [2, 1, 7, 5, 3, 6, 8, 4, 9],
        //         [9, 6, 4, 2, 8, 7, 1, 5, 3],
        //         [5, 8, 3, 4, 9, 1, 2, 6, 7]
        //     ]
        // ];
        // Select a random solution (if choosing from predefined - 'sudokuSolutions')
        // let sudokuSolution = sudokuSolutions[Math.floor(Math.random() * sudokuSolutions.length)];

        // Generate a unique Sudoku puzzle (if not choosing from predefined - 'sudokuSolutions')
        let uniqueSudokuSolution = generateSudoku();
        let sudokuSolution = uniqueSudokuSolution.reduce((a, b) => [...a, ...b]); // flatten the `uniqueSudokuSolution` array into a single array of numbers
        currentSolution = sudokuSolution;

        let cellsToFill;
        if (difficulty === 'easy') {
            cellsToFill = Math.floor(cells.length * 0.7); // Fill 50% of cells
        } else if (difficulty === 'medium') {
            cellsToFill = Math.floor(cells.length * 0.5); // Fill 35% of cells
        } else { // 'hard'
            cellsToFill = Math.floor(cells.length * 0.3); // Fill 20% of cells
        }

        // Randomly choose cells to fill
        let cellsFilled = 0;
        while (cellsFilled < cellsToFill) {
            let cellIndex = Math.floor(Math.random() * cells.length);
            if (!cells[cellIndex].value) {
                cells[cellIndex].value = sudokuSolution[cellIndex];
                cellsFilled++;
            }
        }

        e.target.textContent = 'Start new game';
        handleDisablingOnButtons([showButton, clearButton, checkButton], false);


        // Generating unique Sudoku board with simplified version of backtracking algorithm, which involves deep recursion
        function generateSudoku() {
            var board = Array(9).fill(null).map(() => Array(9).fill(0));

            function isSafe(board, row, col, num) {
                for (let d = 0; d < board.length; d++) {
                    if (board[row][d] == num || board[d][col] == num) {
                        return false;
                    }
                }

                var sqrt = Math.sqrt(board.length);
                var boxRowStart = row - row % sqrt;
                var boxColStart = col - col % sqrt;

                for (let r = 0; r < sqrt; r++) {
                    for (let d = 0; d < sqrt; d++) {
                        if (board[r + boxRowStart][d + boxColStart] == num) {
                            return false;
                        }
                    }
                }
                return true;
            }

            function solveSudoku(board, n) {
                let row = -1;
                let col = -1;
                isEmpty = true;
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        if (board[i][j] == 0) {
                            row = i;
                            col = j;
                            isEmpty = false;
                            break;
                        }
                    }
                    if (!isEmpty) {
                        break;
                    }
                }

                if (isEmpty) {
                    return true;
                }

                for (let num = 1; num <= n; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board, n)) {
                            return true;
                        }
                        else {
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }

            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            var pattern = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            for (let i = 0; i < 9; i++) {
                board[i][i] = pattern[i];
            }

            solveSudoku(board, 9);

            return board;
        }
    }

    function checkResult(e) {
        let isSudomuFull = Array.from(inputFields).every(cell => cell.value !== '');

        if (!isSudomuFull) {
            resultField.textContent = 'Fill all cells first';

            setTimeout(() => {
                resultField.textContent = ''
            }, 2000);

            return;
        }

        let isWin = checkWin();

        if (isWin) {
            table.style.border = '2px solid green';
            resultField.textContent = 'You solved it! Congratulations!';
        } else {
            table.style.border = '2px solid red';
            resultField.textContent = 'NOP! You are not done yet…';
        }

        // function checkIsFull() {
        //     if (e.target.tagName !== 'INPUT') {
        //         return;
        //     }

        //     let isSudomuFull = Array.from(inputFields).every(cell => cell.value !== '');

        //     if (isSudomuFull) {
        //         checkButton.removeAttribute('disabled');
        //         checkButton.style.color = 'white';
        //     }
        // }

        function checkWin() {
            let isWin = true;
            let matrix = createMatrix(inputFields);
            let firstRowSorted = Array.from(matrix[0]).sort((a, b) => a - b); // create arr copy so the first row stays unmodified

            if (firstRowSorted[0] === firstRowSorted[1]) { // solve the problem with whole sudoku filled with the same num
                return isWin = false;
            }

            for (let i = 0; i < matrix.length; i++) {
                let currColumnSorted = createColumn(i).map(Number).sort((a, b) => a - b).map(String);

                Array.from(matrix[i]) // avoid unmodifying original matrix
                    .sort((a, b) => a - b)
                    .forEach((n, j, arr) => {
                        if (arr[j] !== firstRowSorted[j] || currColumnSorted[j] !== firstRowSorted[j]) {
                            return isWin = false;
                        }
                    });
            }

            return isWin;

            function createMatrix(inputs) {
                let matrix = [];
                for (let i = 0; i < inputs.length; i += 9) {
                    matrix.push(Array.from(inputs).map(x => x.value).slice(i, i + 9));
                }
                return matrix;
            }

            function createColumn(i) {
                let col = [];
                for (let j = 0; j < matrix.length; j++) {
                    col.push(matrix[j][i]);
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
        startButton.textContent = 'Start game';
    }

    function showSolution() {
        // Randomly choose cells to fill
        let cellsFilled = cells.filter(x => x.value !== '').length;
        while (cellsFilled < cells.length) {
            let cellIndex = Math.floor(Math.random() * cells.length);
            if (!cells[cellIndex].value) {
                cells[cellIndex].value = currentSolution[cellIndex];
                cellsFilled++;
            }
        }

        // Remove disable on show solution button
        showButton.removeAttribute('disabled');
        showButton.style.color = 'white';
    }

    function addGridLines() {
        // Get all table cells
        let cells = document.querySelectorAll('td');

        // Apply grid to every third cell
        cells.forEach((cell, i) => {
            if (i === 0) {
                return;
            }

            // Add thicker right border to every third cell in a row, except for the cells in the last column
            if (i % 3 === 0 && i % 9 !== 0) {
                cell.style.borderRight = '5px solid black';
            }

            // Add thicker bottom border to every third row, except for the cells in the last row
            // if ()

            if ((Math.floor((i - 1) / 9) + 1) % 3 === 0 && (Math.floor(i / 9) + 1) !== 9) {
                cell.style.borderBottom = '5px solid black';
            }
        });
    }

    function handleDisablingOnButtons(buttonsArr, disabling) {
        // type validation
        if (!Array.isArray(buttonsArr)) {
            console.error("Expected first argument to be an array");
            return;
        }

        if (typeof disabling !== "boolean") {
            console.error("Expected second argument to be a boolean");
            return;
        }

        for (let btn of buttonsArr) {
            if (disabling) {
                btn.disabled = true;
                btn.style.color = 'gray';
            } else {
                btn.removeAttribute('disabled');
                btn.style.color = 'white';
            }

        }
    }
}