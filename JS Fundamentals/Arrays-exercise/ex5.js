function findTopInteger(arr){
    let topArray = [];
    for (let index in arr) {
        let notTop = false;

        for (let i = Number(index) + 1; i < arr.length; i++) {
            // console.log(arr[index], arr[i]);

            if (arr[index] < arr[i]) {
                notTop = true;
                break;
            }
        }

        if (notTop) {
            continue;
        } 
        // console.log(arr[index]);
        topArray[topArray.length] = arr[index];
    }
    console.log('Top Numbers: ' + topArray.join(' - '));
}

findTopInteger([14, 24, 3, 19, 15, 17]);