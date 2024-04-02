const assert = require('chai').assert;
const isOddOrEven = require('../apps/evenOrOdd');

describe('isEvenOrOdd function', () => {
    it('should return undefined when a number is passed as argument', () => {
        assert.isUndefined(isOddOrEven(535));
    });

    it('should return undefined when an object is passed as argument', () => {
        assert.isUndefined(isOddOrEven({key: 'value'}));
    });
    
    it('should return "even" when a string with even length is passed as argument', () => {
        assert.equal(isOddOrEven('lion'), 'even');
        assert.equal(isOddOrEven('fyre'), 'even');

    });
    
    it('should return "odd" when a string with odd length is passed as argument', () => {
        assert.equal(isOddOrEven('mouse'), 'odd');
        assert.equal(isOddOrEven('amethists'), 'odd');
    });
})