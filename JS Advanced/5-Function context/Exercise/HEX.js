class Hex {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        // This function will show its hexidecimal value starting with "0x"
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(number) {
        let n = typeof number === 'Number' ? number : number.value;
        return new Hex(this.value + n);
    }

    minus(number) {
        let n = typeof number === 'Number' ? number : number.value;
        return new Hex(this.value - n);
    }

    parse(hexString) {
        return parseInt(hexString, 16);
    }

}


let FF = new Hex(255);
console.log(FF.toString()); // 0xFF
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString()); // 0xF
console.log(a.plus(b).toString() === '0xF'); // true