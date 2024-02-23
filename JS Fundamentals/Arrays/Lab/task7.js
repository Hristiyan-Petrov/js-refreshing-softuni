function areEqualArrays(arr1, arr2) {

    let sum = 0;
    // let equality = true;
    
    for (index in arr1) {
        if (arr1[index] === arr2[index]) {
            sum += Number(arr1[index]);
        } else {
            // equality = false;
            console.log(`'Arrays are not identical. Found difference at ${index} index'.`);
            return;
        }
    }
    console.log(`Arrays are identical. Sum: ${sum}`);
}

areEqualArrays(['1'], ['10'])