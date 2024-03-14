function solve(input) {
    // input = JSON.parse(input);

    let result = [JSON.parse(input.shift())];

    input.forEach(array => {
        // array = JSON.parse(array)

        if (isUnique(JSON.parse(array))) {
            result.push(JSON.parse(array).sort(sortDescending));
        }
    });

    // console.log(result);

    result.sort((a, b) => a.length - b.length).forEach(arr => {
        console.log(`[${arr.join(', ')}]`);
    })

    function isUnique(arr) {
        let isUnique = true;

        result.forEach(currArr => {
            let isUniqueCurrent = false;
            
            if (currArr.length === arr.length) {
                let sorted1 = currArr.sort(sortDescending);
                let sorted2 = arr.sort(sortDescending);

                for (let i = 0; i <  sorted1.length / 2; i++) {
                    if (sorted1[i] !== sorted2[i] || sorted1[sorted1.length - i] !== sorted2[sorted2.length - i]) {
                        isUniqueCurrent = true;
                    }
                }

                isUniqueCurrent ? isUnique : isUnique = false;
            }
        })

        return isUnique;
    }

    function sortDescending(a, b) {
        return b - a;
    }
}


solve(
    ["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]
    

)