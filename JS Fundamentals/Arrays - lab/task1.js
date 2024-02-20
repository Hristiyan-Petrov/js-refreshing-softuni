function sumFirstAndLastElements(array) {
    let result = Number(array[0]) + Number(array[array.length - 1]);
    console.log(result);
}

sumFirstAndLastElements(['10', '17', '22', '33']);