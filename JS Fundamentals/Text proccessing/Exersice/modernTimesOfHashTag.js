function findHashtagWords(text) {
        let words = text.match(/#\w+/g);
        
        if (words) {
            words.forEach(word => {
                let trimmedWord = word.slice(1); // Remove the '#' character
                // Check if the word contains only letters
                if (/^[A-Za-z]+$/.test(trimmedWord)) {
                    console.log(trimmedWord);
                }
            });
        }
}

findHashtagWords('Nowadays everyone uses # to tag a #special word in #socialMedia')