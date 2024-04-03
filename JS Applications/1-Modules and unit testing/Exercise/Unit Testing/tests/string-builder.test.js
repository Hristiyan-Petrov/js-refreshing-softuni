const assert = require('chai').assert;
const StringBuilder = require('../apps/string-builder');

describe('StringBuilder class', () => {
    let str;
    beforeEach(() => {
        str = new StringBuilder('hello');
    });

    it('should be a function', () => {
        assert.isFunction(StringBuilder);
    });

    it('should initialize correctly', () => {
        assert.instanceOf(str, StringBuilder);
        assert.equal(str.toString(), 'hello');
    });

    it('should append string correctly', () => {
        str.append(', there');
        assert.equal(str.toString(), 'hello, there');
    });

    it('should prepend string correctly', () => {
        str.prepend('User, ');
        assert.equal(str.toString(), 'User, hello');
    });

    it('should insert string correctly at valid index', () => {
        str.insertAt('woop', 5);
        assert.equal(str.toString(), 'hellowoop');
    });

    it('should remove elements correctly', () => {
        str.remove(0, 2);
        assert.equal(str.toString(), 'llo');
    });

    it('should throw TypeError if non-string is passed', () => {
        assert.throws(() => str.append(345), TypeError, 'Argument must be а string');
        assert.throws(() => str.prepend(12), TypeError, 'Argument must be а string');
        assert.throws(() => str.insertAt(true, 5), TypeError, 'Argument must be а string');
    });
});