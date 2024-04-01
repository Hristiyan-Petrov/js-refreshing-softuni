function sumElements(nums, startIndex, endIndex) {
    startIndex < 0 ? startIndex = 0 : null;
    endIndex > nums.length ? endIndex = nums.length : null;

    if (!Array.isArray(nums)) {
        return NaN;
    }

    let result = nums
        .slice(startIndex, endIndex + 1)
        .reduce((acc, n, i, arr) => {
            if (Number(n)) {
                return acc + n
            } else {
                return NaN;
            }
        }, 0);

        if (String(result).indexOf('.') > 0) {
            result = result.toFixed(1);
        }

        return result;
}

let result = sumElements(
    [1.1, 2.2, 3.3, 4.4, 5.5], -3, 1
);

console.log(result);