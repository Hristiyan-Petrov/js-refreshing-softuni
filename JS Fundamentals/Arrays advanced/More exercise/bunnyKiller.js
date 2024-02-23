function mission(input) {
    // const bombCount = input.pop().split(' ');
    let bombCount = input.pop().split(' ').map(str => str.split(',').map(Number));

    // let matrix = createMatrix(input);
    let matrix = input.map(row => row.split(' ').map(Number));

    function createMatrix(input) {
        let matrix = [];
        for (let row of input) {
            matrix.push(row.split(' '));
        }
        return matrix;
    }

    let killCount = bombCount.length;
    let damageDealth = 0; // The hero kills the bad corrupted bunnies

    // First deal up with bomb bunnies 
    // While there are available bombs, explode them 1 by 1
    for (let i = 0; i < bombCount.length; i++) {
        let [row, col] = bombCount[i];

        // console.log(matrix);
        bombExplode(row, col);
        // console.log(matrix);
    }

    // Then deal up with killing remaining alive bunnies
    // Itereate trough the whole matrix and  if a cell (bunny) is not dead, kill it
    killRemaining();

    printOutput(damageDealth, killCount);

    function bombExplode(row, col) {
        let bombPower = matrix[row][col];

        if (bombPower <= 0) {
            return;
        }

        for (let i = row - 1; i <= row + 1; i++) {
            // if (i < 0 || i > matrix[0].length) {
            //     continue;
            // }
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < matrix.length && j >= 0 && j < matrix.length) {
                    matrix[i][j] -= bombPower;
                }
            }
        }
        damageDealth += bombPower
    }

    function killRemaining() {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {

                if (matrix[i][j] > 0) {
                    damageDealth += matrix[i][j];
                    killCount++;
                }
            }
        }
    }

    function printOutput(damageDone, kills) {
        console.log(damageDone);
        console.log(kills);
    }
}





mission(['10 10 10',
    '10 10 10',
    '10 10 10',
    '0,2']

)