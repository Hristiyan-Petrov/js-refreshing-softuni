function condense(arr) {
    console.log(`Start numbers -> ${arr.join(' - ')}`);
    
    while (arr.length > 1) {
        let condensedArr = []
        
        // for (let i in arr) {
        for (let i = 0; i < arr.length - 1; i++) {

            condensedArr[i] = arr[i] + arr[i + 1];
            // console.log(arr[i], arr[i + 1]);
        }
        arr = condensedArr;
        console.log(`Condensation -> ${arr.join(' - ')}`);
    }
}

condense([2,10,3]);

