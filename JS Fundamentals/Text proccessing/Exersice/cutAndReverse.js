function cutAndReverse(input) {
    let firstHalf = input.substring(0, input.length / 2);
    let secondHalf = input.substring(input.length / 2);

    let reversedFirsthalf = reverse(firstHalf);
    let reversedSecondHalf = reverse(secondHalf);

    console.log(reverse(input.substring(0, input.length / 2)));
    console.log(reversedSecondHalf);

    function reverse(string) {
        let result = [];
        for (let i = string.length; i >= 0; i--) {
            result.push(string[i]);
        }
        return result.join('');
    }
}

cutAndReverse('tluciffiDsIsihTgnizamAoSsIsihT')