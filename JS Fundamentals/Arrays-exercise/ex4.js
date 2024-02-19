function rotateArray(array, rotations) {
    while (rotations > 0) {
        // array.push(array[0]);
        // array.splice(0, 1);

        let firstElement = 0;
        for (let i in array) {
            if (i == 0) {
                firstElement = array[0];
            }
            // console.log(array[i], array[Number(i) + 1]);
            array[i] = array[Number(i) + 1];
        }
        array[array.length- 1] = firstElement;

        rotations--;
    }
    console.log(array);
}

rotateArray([2, 4, 15, 31], 5);