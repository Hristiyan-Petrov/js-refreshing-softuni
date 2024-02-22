function arrayManipulator(manipulations) {
    let numbers = manipulations
        .shift()
        .split(' ')
        .map(Number);

        for (let manipulation of manipulations) {
            manipulation = manipulation.split(' ').filter(x => x !== '');
            const command = manipulation[0];

            if (command === "Add") {
                const index = Number(manipulation[1]);
                const elementToAdd = Number(manipulation[2]);
                numbers.splice(index, 0, elementToAdd);
            } else if (command === "Remove") {
                const index = Number(manipulation[1]);
                numbers.splice(index, 1);
            } else if (command === "RemoveAt") {
                const indexes = manipulation.slice(1).sort((a, b) => a - b);
                for (const index of indexes) {
                    numbers.splice(index, 1);
                }
            } else if (command === "Insert") {
                const index = Number(manipulation[1]);
                const elementsToInsert = manipulation.slice(2).map(Number);
                numbers.splice(index + 1, 0, ...elementsToInsert);
                numbers.splice(index + 1, 0, ...elementsToInsert);
            }
        }

        console.log(numbers.join(" "));

        }

    // return numbers;

arrayManipulator(['4 19 2 53 6 43',
    'Add 0 3',
    'Remove 2',
    'RemoveAt 1',
    'Insert 8 3']
)