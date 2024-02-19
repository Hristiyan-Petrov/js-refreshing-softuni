function mergeArrays(arr1, arr2) {
    let mergedArray = [];

    for (let index in arr1) {
        if (index % 2 === 0) {
            mergedArray[index] = Number(arr1[index]) + Number(arr2[index]);
        } else {
            mergedArray[index] = arr1[index] + arr2[index];
        }
    }

    console.log(mergedArray.join(' - '));
}

mergeArrays(['13', '12312', '5', '77', '4'],
['22', '333', '5', '122', '44']

);