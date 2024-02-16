function sortNums(arr) {
    arr.sort((a, b) => a - b);
}

let nums = [5, -49, 81, 3, 1];
sortNums(nums);
if (JSON.stringify(nums) == '[-49,3,5,81]') {
    console.log('They are right!');
} else {
    console.log(`Error, the new order is ${nums.join(', ')}`);
}