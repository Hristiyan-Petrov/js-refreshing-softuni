// Approach 1
function solve(input) {
    const listProcessorBuilder = function() {
        let collection = [];

        return {
            add: text => collection.push(text),
            remove: text => collection = collection.filter(x => x !== text),
            print: () => console.log(collection.join())
        };
    }

    let listProcessor = listProcessorBuilder();

    input
        .map(x => x.split(' '))
        .forEach(([command, text]) => listProcessor[command](text));
}

// Approach 2
function solve(input) {
    let collection = [];

    let commandExecutor = {
        'add': function (str) {
            collection.push(str);
        },
        'remove': function (str) {
            collection = collection.filter(item => item !== str);
        },
        'print': function () {
            console.log(collection.join(','));
        }
    };

    input
        .map(x => x.split(' '))
        .forEach(([command, text]) => commandExecutor[command](text));
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
// Output: again,again

// solve(['add pesho', 'add george', 'add peter', 'remove peter','print']);
// Output: pesho,george

// solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);