// import chai from "chai";
const assert = require('chai').assert;
const calc = require('./calculator');

describe('Calc sum', function () {
    it('Should return positive number when adding two positive numbers', () => {
        // Arrange
        let firstNum = 1;
        let secondNum = 5;

        // Act
        let result = calc.sum(firstNum, secondNum);

        // Assert
         assert.equal(result, 6);
    });

    it('Should return negative number when adding two negatives numbers', () => {
        let result = calc.sum(-5, -10);

        assert.equal(result, -15);
    })
});