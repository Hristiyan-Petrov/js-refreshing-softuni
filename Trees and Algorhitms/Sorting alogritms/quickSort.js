// Quick Sort is very good at sorting large arrays,
// but Insertion Sort is often a better choice for small arrays.

// Method 1
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    // Step 1: Choose a Pivot Element
    let pivot = arr[0];

    // Step 2: Partition the Array
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    // Step 3: Recursively Sort the Subarrays
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}



// Method 2

function partition(arr, start, end) {
    const pivot = arr[start];

    let swapIndex = start;  //  will keep track of where the pivot will end up.

    for (let i = start + 1; i <= end; i++) {

        // check if the pivot is greater than the current element
        if (pivot > arr[i]) {
            swapIndex++;

            if (i !== swapIndex) {
                // SWAP
                [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
            }
        }
    }

    if (swapIndex !== start) {
        // Swap the pivot with the element at the swap index
        [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]]
    }

    return swapIndex;
}

function quickSort2(arr, start = 0, end = arr.length - 1) {

    // Base case
    if (start >= end) return;


    // 1. Call the partition helper function on the array.
    let pivotIndex = partition(arr, start, end = arr.length - 1);



    // 2. When the helper returns the updated pivot index, recursively call the pivot helper on the subarray to the left of that index,
    //  and the subarray to the right of that index.
    
    // Left
    quickSort(arr, start, pivotIndex - 1);

    // Right
    quickSort(arr, pivotIndex + 1, end);

    return arr;
}

console.log(quickSort([3, 7, 2, 5, 1, 4, 6, 8]));
console.log(quickSort2([3, 7, 2, 5, 1, 4, 6, 8]));
