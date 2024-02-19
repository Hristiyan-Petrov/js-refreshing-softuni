function reverse(arr) {
    // let result = '';
    // for (let i = arr.length - 1; i >= 0; i--) {
    //     result += `${arr[i]} `;
    // }

    // console.log(result);

    let reversedArr = [];
    for (let i = 0; i < arr.length / 2; i++) {
        swapElements(arr, i, arr.length - 1 - i)
    }

    function swapElements(arr, i, j) {
        reversedArr[j] = arr[i];
        reversedArr[i] = arr[j];
    }

    console.log(reversedArr);
}

reverse(['a', 'b', 'c', 'd', 'e']);