let trainOperations = input => {
    let wagons = input.splice(0, 1)[0].split(' ').map(Number); 
    let maxWagonCapacity = Number(input.splice(0, 1)[0]);

    for (let operation of input) {
        operation = operation.split(' ');
        let command = operation[0];

        if (command === 'Add') { // If command is 'Add' - add new wagon at the end
            wagons.push(Number(operation[1]));
        } else {    // find an existing wagon to fit the new passengers without exceeding max capacity
            for (let wagonIndex in wagons) {
                if (wagons[wagonIndex] + Number(command) <= maxWagonCapacity) {
                    wagons[wagonIndex] += Number(command);
                    break;
                }
            }
        }
    }

    return wagons.join(' - ');
}
let result = trainOperations(['0 0 0 10 2 4',
    '10',
    'Add 10',
    '10',
    '10',
    '10',
    '8',
    '6']
);
console.log(result); 