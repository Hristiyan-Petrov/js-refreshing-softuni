function fillWords([text, fillingWordsArray]) {
    const blank = '_';

    for (let word of text.split(' ')) {

        if (word.includes(blank)) {

            // Trims dots and commas
            if (word[word.length - 1] !== blank) {
                word = word.substring(0, word.length - 1);
            }

            for (let fillingWord of fillingWordsArray) {

                if (fillingWord.length === word.length) {
                    text = text.replace(word, fillingWord);
                    fillingWordsArray.splice(fillingWordsArray.indexOf(fillingWord), 1);
                    break;
                }
            }
        }
    }

    // Very heavy, hard and unnecessary solution with object
    // Create object with blank spaces and their length as key
    // let blanksObject = {};
    // for (let word of text.split(' ')) {
    //     if (word.includes(blank)) {

    //         // Check for comma ot dot at the end
    //         if (word[word.length - 1] !== blank) {
    //             word = word.substring(0, word.length - 1);
    //         }

    //         blanksObject[word.length] = word;
    //         // blanksObject[word] = word.length;
    //     }
    // }

    // // Replace blank space from object with same length filling word, cheching length with key
    // for (let blankKey in blanksObject) {
    //     for (let fillingWord of fillingWordsArray) {
    //         if (blankKey == fillingWord.length) {
    //             blanksObject[blankKey] = fillingWord;
    //         }
    //     }
    // }   


    // for (let word of text.split(' ')) {
    //     if (word.includes(blank)) {

    //         // Check for such legnth 
    //         // blanksObject.hasOwnProperty(word.length)

    //         // Check for comma ot dot at the end
    //         if (word[word.length - 1] !== blank) {
    //             word = word.substring(0, word.length - 1);
    //         }
    //         // console.log(text);
    //         text = text.replace(word, blanksObject[word.length]);
    //     }
    // }



    console.log(text);
}

fillWords(
    ['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.',
        ['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained']]

)