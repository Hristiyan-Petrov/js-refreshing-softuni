function splitPascalCase(string) {
    let result = [];

    for (let i = 0; i < string.length; i++) {

        if (string[i] === string[i].toUpperCase()) {

            for (let j = i + 1; j < string.length; j++) {

                if (j === string.length - 1) {
                    let word = string.slice(i);
                    result.push(word);
                    break;
                }


                if (string[j] === string[j].toUpperCase()) {
                    let word = string.substring(i, j);
                    result.push(word);
                    break;
                }
            }
        }
    }

    console.log(result.join(', '));

}

splitPascalCase('SplitMeIfYouCanHaHaYouCantOrYouCan');