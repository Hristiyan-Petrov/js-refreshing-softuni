const assert = require('chai').assert;
const isSymmetric = require('../checkForSymmetry');

describe('isSymmetric function', () => {
    
    it('should take an array as argument', () => {
        let array = [1, 2, 3, 2, 1];
        assert.doesNotThrow(() => isSymmetric(array), Error);
    });

    it('should return false for any input that isn’t of the correct type', () => {
        assert.isFalse(isSymmetric('not an array'));
        assert.isFalse(isSymmetric(123));
        assert.isFalse(isSymmetric(null));
    });

    it('should return true if the input array is symmetric', () => {
        assert.isTrue(isSymmetric([1, 2, 3, 2, 1]));
        assert.isTrue(isSymmetric(['a', 'b', 'a']));
        assert.isTrue(isSymmetric([])); // empty array is symmetric
    });

    it('should return false if the input array is not symmetric', () => {
        assert.isFalse(isSymmetric([1, 2, 3, 4, 5]));
        assert.isFalse(isSymmetric(['a', 'b', 'c']));
    });
});