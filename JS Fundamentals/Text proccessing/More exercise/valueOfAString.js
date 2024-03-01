function sumAsciiCodes([input, letterCase]) {
    // You should not sum the ASCII codes of any characters, which are not letters

    let start = 0;
    let end = 0;

    if (letterCase === 'UPPERCASE') {
        start = 65;
        end = 90;
    } else if (letterCase === 'LOWERCASE') {
        start = 97;
        end = 122;
    }

    let result = 0;
    for (let i = start; i <= end; i++) {
        for (let char of input) {
            if (i === char.charCodeAt()) {
                result += i;
            }
        }
    }

    console.log(`The total sum is: ${result}`);
}

sumAsciiCodes(['HelloFromMyAwesomePROGRAM',
'LOWERCASE']

)