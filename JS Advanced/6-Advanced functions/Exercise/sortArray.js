function sortArray(arr, sorting) {
    let sortFn = null;
    if (sorting === 'asc') {
        sortFn = (a, b) => a - b;
    } else {
        sortFn = (a, b) => b - a;
    }

    return arr.sort(sortFn);
}

sortArray([14, 7, 17, 6, 8], 'desc')