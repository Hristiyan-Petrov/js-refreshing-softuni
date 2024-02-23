function arrayManipulations(integers, commands) {
    for (let command of commands) {
        command = command.split(' ');
        let task = command.shift();

        if (task === 'add') {
            let [index, element] = command;
            integers.splice(index, 0, Number(element));

        } else if (task === 'addMany') {
            let index = command.shift();
            integers = addMany(command, index);

        } else if (task === 'contains') {
            let [element] = command;
            console.log(integers.indexOf(Number(element)));

        } else if (task === 'remove') {
            let [index] = command;
            integers.splice(index, 1);

        } else if (task === 'shift') {
            let positions = command.shift();
            integers = integersShiftLeft(integers, positions);

        } else if (task === 'sumPairs') {
            integers = sumPairs(integers);

        } else if (task === 'print') {
            console.log(`[ ${integers.join(', ')} ]`);
            break;
        }

    }

    function addMany(elementsToAdd, index) {
        elementsToAdd.forEach((element, i) => {
            integers.splice(index + i, 0, Number(element));
        });

        return integers;
    }

    function integersShiftLeft(elements, positions) {
        for (let i = 0; i < positions; i++) {
            let movedNumber = elements.shift();
            elements.push(movedNumber);
        }

        return elements;
    }

    function sumPairs(elements) {
        let result = [];

        for (let i = 0; i < elements.length; i += 2) {
            if (i + 1 >= elements.length && elements.length % 2 !== 0) {
                result.push(Number(elements[i]));
            } else {
                result.push(Number(elements[i]) + Number(elements[i + 1]));
            }
        }

        return result;
    }
}

arrayManipulations([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    ["sumPairs", "sumPairs", "addMany 0 -1 -2 -3", "print"]);