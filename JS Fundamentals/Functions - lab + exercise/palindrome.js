let checkArrayForPalindrome = function (array) {
    for (let el of array) {
        let result = isPalindrome(el);
        console.log(result);
    }
}

let isPalindrome = function (n) {
    let shreddedNumber = toArray(n);

    for (let i = 0; i < shreddedNumber.length / 2; i++) {
        if (shreddedNumber[i] !== shreddedNumber[shreddedNumber.length -1 - i]) {
            return false;
        } 
    }

    return true;
}

let toArray = number => String(number).split('');

checkArrayForPalindrome([323, 3223, 122]);