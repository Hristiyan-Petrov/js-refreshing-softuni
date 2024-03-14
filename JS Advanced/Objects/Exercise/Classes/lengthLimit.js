class Stringer {
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = innerLength;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        if (length <= 0 || length > this.innerLength) {
            this.innerLength = 0;
        } else {
            this.innerLength -= length;
        }
    }

    toString() {
        //If the length of the string is greater than the length property, the string should be cut to from right to left, so that it has the same length as the length property, and you should add 3 dots after it, if such truncation was done.
        // If the length property is 0, just return 3 dots

        // if (this.innerLength === 0) {
        //     return '...';
        // } else
         if (this.innerString.length > this.innerLength) {
            return this.innerString.slice(0, this.innerLength) + '...';
        } else {
            return this.innerString;
        }
    }

}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test
