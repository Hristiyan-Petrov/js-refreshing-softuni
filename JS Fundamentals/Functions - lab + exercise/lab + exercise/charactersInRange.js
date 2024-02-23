function printCharsBetween(char1, char2) {
    // console.log(char1.charCodeAt(), char2.charCodeAt());

    let char1Ascii = null, char2Ascii = null;

    function convertASCIIICode(a, b) {
        char1Ascii = a.charCodeAt(), char2Ascii = b.charCodeAt();
    }

    convertASCIIICode(char1, char2);

    if (char1Ascii > char2.charCodeAt()) {
        [char1, char2] = [char2, char1];
         convertASCIIICode(char1, char2);
    }

    for (let i = char1Ascii + 1; i <= char2Ascii - 1; i++) {
        console.log(String.fromCharCode(i));
    }


}

printCharsBetween('C', '#')