function solve(array) {
    let originalSum = 0;
    let calculatedSum = 0;

    for (const key in array) {
        originalSum += array[key];

        if (array[key] % 2 === 0) {
            array[key] += Number(key);
        } else {
            array[key] -= key;
        }
        
        calculatedSum += array[key];
    }
    console.log(array);
    console.log(originalSum);
    console.log(calculatedSum);
}


solve([-5, 11, 3, 0, 2]);