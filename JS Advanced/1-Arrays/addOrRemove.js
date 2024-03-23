function modifyArray(commands) {
    let array = [];

    for (let i = 0; i < commands.length; i++) {
        // let currentNumber = array[array.length - 1] + 1;

        if (commands[i] === 'add') {
            array.push(i + 1);
        } else {
            array.splice(array.length - 1, 1);
        }
    }

    if (array.length) {
        console.log(array.join(' '));
    } else {
        console.log('Empty');
    }
}

let result = modifyArray(['remove', 'remove', 'remove']);