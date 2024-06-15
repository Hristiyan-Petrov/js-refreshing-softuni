function main(input) {

    let [parent, sub] = input.split(' ');

    let counter = 0;

    while (parent.includes(sub)) {

        if (parent.indexOf(sub) >= 0) {
            parent = parent.replace(sub, '');
            counter++;
        }
    }

    console.log(counter);
}

// For testing purposes, we're defining a constant input string
const testInput = 'abcdef abc'; 

// Then we call the main function with this input string
main(testInput);