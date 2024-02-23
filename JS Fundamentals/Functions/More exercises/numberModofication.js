function modificate(number) {
    let currAverage = averageValueOfDigits(number);

    while (currAverage < 5) {
        number = addDigit(number);
        currAverage = averageValueOfDigits(number);
    }

    console.log(number);

    function averageValueOfDigits(n) {
        let average = 0;
        n = n.toString().split('');
        for (el of n) {
            average += Number(el);
        }
        return average / n.length;
    }

    function addDigit(n) {
        n = n.toString();
        n += '9';
        return n;
    }
}

modificate(101);