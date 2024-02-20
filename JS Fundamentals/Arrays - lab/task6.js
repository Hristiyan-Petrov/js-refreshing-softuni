function evenAndOddSubstraction(numbersArr) {
    // let evenNumbersSum = 0;
    // let oddNumbersSum = 0;
    //     if (num % 2 === 0) {
    //         evenNumbersSum += num;
    //     } else {
    //         oddNumbersSum += num;
    //     }


    let evenNumbersSum = 0, oddNumbersSum = 0;

    for (let num of numbersArr) {
        num % 2 === 0 ? evenNumbersSum += num : oddNumbersSum += num;
    }

    let finalCalculation = evenNumbersSum - oddNumbersSum;
    console.log(finalCalculation);
}

evenAndOddSubstraction([3, 5, 7, 9]);