function sumEvenNumbers(numbersArr) {
    let result = 0;

    for (const n of numbersArr) {
        let num = Number(n);
        if (num % 2 === 0) {
            result += num;
        }
    }

    console.log(result);
}

sumEvenNumbers(['2','4','6','8','10']);