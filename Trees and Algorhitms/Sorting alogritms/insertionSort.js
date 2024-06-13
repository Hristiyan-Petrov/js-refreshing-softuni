// Insertion Sort is good for:
// Small arrays
// Any size, almost sorted arrays
// Sorting data in real-time

// Insertion Sort is bad for:
// Larger arrays that aren’t “almost sorted”

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentValue = arr[i];

        let j;

        for (j = i - 1; j >= 0 && arr[j] > currentValue ; j--) {
            console.log(arr[i], arr[j]);
            arr[j + 1] = arr[j];
        }

        arr[j + 1] = currentValue;
        console.log(arr);
    }

    return arr;
}

console.log(insertionSort([5, 2, 4, 6, 1, 3]));