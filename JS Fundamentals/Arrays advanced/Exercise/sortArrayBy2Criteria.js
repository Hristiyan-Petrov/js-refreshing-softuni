let sortByTwoCriteria = input => {

    // Function expression should be declared before using

    let lengthCompare = function (a, b) {
        if (a.length < b.length) {
            return -1;
        } else if (a.length > b.length) {
            return 1;
        } else {
            // return alphabeticalCompare(a, b);
            return a.toLowerCase().localeCompare(b.toLowerCase());

        }
    }

    return input.sort(lengthCompare);


    // Function declaration can be declared after using

    function alphabeticalCompare(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }
}

console.log(sortByTwoCriteria(["Isacc", 'isaac', "Theodor", "Jack", "Hzrrison", "George", 'Harrison']));