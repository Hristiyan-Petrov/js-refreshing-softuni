// There are usually always better options than Bubble Sort.
//  For small arrays, or almost sorted arrays, Insertion Sort is usually better. 
// For large arrays, Merge Sort or Quick Sort will be much better.

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