function bubbleSort(arr) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {

            console.log(arr[j], arr[j + 1]);

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                console.log(arr);
            }
        }
    }

    return arr;
}


let myArray = [2, 3, 1, 2];
console.log(bubbleSort(myArray));