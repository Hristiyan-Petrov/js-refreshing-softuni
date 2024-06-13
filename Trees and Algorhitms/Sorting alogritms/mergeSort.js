// Merge Sort one of the most efficient sorting algorithms for sorting large arrays.

// However, if you know that the input array will be small, or sorted/almost sorted,
// you might be better off using an algorithm like insertion sort


// merge helper function to merge two sorted arrays.

function merge(left, right) {
    let sortedArr = [];

    while (left.length && right.length) {

        // Insert the smallest item into sortedArr
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
    }

    return [...sortedArr, ...left, ...right];
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);

    // Recursive calls
    let left = mergeSort(arr.slice(0, mid));
    let rigth = mergeSort(arr.slice(mid));

    return merge(left, rigth);
}

console.log(mergeSort([3, 5, 8, 5, 99, 1]));