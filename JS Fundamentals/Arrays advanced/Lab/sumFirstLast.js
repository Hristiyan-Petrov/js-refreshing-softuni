let solve = function(arr) {
    let firstNum = Number(arr.pop()), lastNum = Number(arr.shift());
    return firstNum + lastNum;
}

console.log(solve(['5','20', '30', '40'])); 