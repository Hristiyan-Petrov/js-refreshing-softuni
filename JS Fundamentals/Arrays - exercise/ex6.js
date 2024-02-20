function solve(arr) {
    let hasEquality = false;

    for (let index in arr) {
        equality = checkSums(index, arr)

        if (equality) {
            console.log(index);
            hasEquality = true;
        }
    }
    if (!hasEquality) {
        console.log('No :V');
    }
}

function checkSums(i, arr) {
    let leftSum = checkLeftSum(i, arr);
    let rightSum = checkRightSum(i, arr);
    return (leftSum === rightSum);
}

function checkLeftSum(index, arr) {
    let sum = 0;

    if (Number(index) === 0) {
        return sum;
    }

    for (let i = Number(index) - 1; i >= 0; i--) {
        sum += arr[i];
    }
    return sum;
}

function checkRightSum(index, arr) {
    let sum = 0;
    
    if (Number(index) === arr.length - 1) {
        return sum;
    }

    for (let i = Number(index) + 1; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

solve([10, 5, 5, 99, 3, 4, 2, 5, 1, 1, 4, 5]);