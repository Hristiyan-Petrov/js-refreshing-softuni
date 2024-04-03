const assert = require('chai').assert;
let sum = require('../sumNumbers');

describe('Sum numbers function', () => {
    it('should take an array of numbers as argument', () => {
        let array = [1, 2, 3, 4];
        assert.isArray(array);
    });

    it('should take an array of numbers as argument', () => {
        let array = [1, 2, 3, 4];
        let result = sum(array);
        assert.equal(result, array.reduce((a, x) => a + x), 0);
    });
});