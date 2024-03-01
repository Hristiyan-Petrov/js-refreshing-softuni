function replacerepeatingChars(input) {
    let counter = 0;

    while (counter < input.length) {
        if (input[counter] === input[counter + 1]) {
            input = input.slice(0, counter) + input.slice(counter + 1);
        } else {
            counter++;
        }
    }

    console.log(input);
}

replacerepeatingChars('aaaaabbbbbcdddeeeedssaa');