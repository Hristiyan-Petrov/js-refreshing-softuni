// Selection Sort is simple, but inefficient. 
// It can outperform efficient algorithms like Merge Sort and Quick Sort for small arrays (<20 elements),
//  but Insertion Sort is usually more effective in these cases.

function selectionSort(arr) {
    let smallestIndex;

    for (let i = 0; i < arr.length; i++) {
        smallestIndex = i;

        for (let j = i + 1; j < arr.length; j++) {

            // console.log(arr[smallestIndex], arr[j]);

            if (arr[smallestIndex] > arr[j]) {
                smallestIndex = j;
                // console.log('smallest: ', arr[smallestIndex]);
            }
        }

        if (smallestIndex !== i) {
            [arr[i], arr[smallestIndex]] = [arr[smallestIndex], arr[i]];
        }

        // console.log(arr);
    }
    return arr;
}

let myArr = [5, 2, 4, 6, 1, 3];
console.log(selectionSort(myArr));