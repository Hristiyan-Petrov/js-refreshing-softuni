function solve(arr1, arr2) {
    for (let element1 of arr1) {
        for (const element2 of arr2) {
            if (element1 === element2) {
                console.log(element2);
            }
        }
    }
}

solve(['S', 'o', 'f', 't', 'U', 'n', 'i', ' '],
    ['s', 'o', 'c', 'i', 'a', 'l']

);