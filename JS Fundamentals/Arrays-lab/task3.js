function reverseArray(n, arr) {
    let cutArr = [];
    for (let i = 0; i < n; i++) {
        cutArr.push(arr[i]);
    }
    // console.log(arr.splice(0, n));


    let result = '';
    for (let i = cutArr.length - 1; i >= 0; i--) {
        result += cutArr[i] + ' ';
    }

    console.log(result);
}

reverseArray(3, [10, 20, 30, 40, 50]);
