function solve(input) {
    let array = input.shift().split(' ').map(Number)

    for (let line of input) {
        let [command, index1, index2] = line.split(' ');
        let n1 = array[index1];
        let n2 = array[index2];

        switch (command) {
            case 'swap':
                array.splice(index1, 1, n2);
                array.splice(index2, 1, n1);
                break;

            case 'multiply':
                array.splice(index1, 1, n1 * n2);
                break;

            case 'decrease':
                array = array.map(x => --x);
                break;

            default:
                console.log(array.join(', '));
                break;
        }
    }
}

solve([
    '23 -2 321 87 42 90 -123',
    'swap 1 3',
    'swap 3 6',
    'swap 1 0',
    'multiply 1 2',
    'multiply 2 1',
    'decrease',
    'end'
]
)