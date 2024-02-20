function solve(arr) {
    // let sequence = [];
    // let longest = [];

    // for (let i = 0; i < arr.length; i++) {
    //     if (!sequence.length) {
    //         sequence = [arr[i]];
    //     }

    //     if (arr[i] === arr[i + 1]) {
    //         sequence.push(arr[i + 1]);
    //         continue;
    //     }

    //     if (sequence.length > longest.length) {
    //         longest = sequence;
    //     }
    //     sequence = [];
    // }

    // console.log(longest);


    let currentSeq = [arr[0]];
    let longestSeq = [];

    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
            currentSeq.push(arr[i]);
        } else {
            if (currentSeq.length > longestSeq.length) {
                longestSeq = currentSeq;
            }
            currentSeq = [arr[i]];
        }
    }

    console.log(longestSeq);

}

solve([0, 1, 1,1,1,1, 5, 2, 2, 6, 3, 3, 3]);