function solve(arr, magicNum) {
    for (let index in arr) {
        for (i = Number(index); i < arr.length; i++) {
            if (arr[index] + arr[i + 1] === magicNum) {
                console.log(arr[index], arr[i + 1]);
            }
        }
    }
}

solve([14, 20, 60, 13, 7, 19, 8], 27
)