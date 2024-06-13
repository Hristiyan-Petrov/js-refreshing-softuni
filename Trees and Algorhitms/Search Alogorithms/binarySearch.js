// Use Binary Search on medium to large sorted arrays.


//Iterative Binary Search Algorithm
function binarySearch(arr, target) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        // If element is smaller than mid, it can only be present in left subarray
        if (arr[middle] < target) {
            start = middle + 1;

            // Else if the element is greater than mid, it can only be present in right subarray
        } else if (arr[middle] > target) {
            end = middle - 1;

        } else {
            return middle;
        }
    }

    return -1;
}


// Recursive Binary Search Algorithm

function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
    if (low <= high) {
        let mid = low + Math.floor((high - low) / 2);

        if (arr[mid] === target) return mid;

        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > target) {
            return binarySearchRecursive(arr, target, low, mid - 1);
        }

        // Else the element can only be present
        // in right subarray
        return binarySearchRecursive(arr, target, mid + 1, high);
    }

    // Reach here when element is not
    // present in array
    return -1;
}

console.log(binarySearch([1, 2, 3, 4], 1)) // 1
console.log(binarySearch([1, 2, 3, 5, 9], 4)) // -1
console.log(binarySearch([1, 2, 3, 4, 5], 5)) // 4
console.log(binarySearch([0, 3], 3)) // 1

console.log(binarySearchRecursive([1, 2, 3, 4], 1)) // 1
console.log(binarySearchRecursive([1, 2, 3, 5, 9], 4)) // -1
console.log(binarySearchRecursive([1, 2, 3, 4, 5], 5)) // 4
console.log(binarySearchRecursive([0, 3], 3)) // 1