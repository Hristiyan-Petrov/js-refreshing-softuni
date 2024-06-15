function isSameReflection(word1, word2) {

    // rotate second word to each possible variant and comapre it to the other word

    let current = word2;

    for (let i = 0; i <= word1.length; i++) {
        if (current === word1) return 1;
        current = rotateOneSpace(current);
    }


    return -1;

    function rotateOneSpace(word) {
        console.log( word.slice(1),  word.charAt(0));
        return word.slice(1) + word.charAt(0);
        let arr = word.split('');
        let first = arr.splice(0, 1);
        arr.push(first[0])
        return arr.join('');
    }
}

console.log(isSameReflection('sample', 'amples'));