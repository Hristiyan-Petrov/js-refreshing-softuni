// import chai from "chai";
const expect = require('chai').expect;
const assert = require('chai').assert;
const calc = require('../calculator');

describe('Calc Multiplication', function () {
    it('Should return positive number when multiplying two positive numbers', () => {
        // Arrange
        let firstNum = 1;
        let secondNum = 5;

        // Act
        let result = calc.multiply(firstNum, secondNum);

        // Assert
        //  assert.equal(result, 5);
        expect(result).to.equal(5);
    });

    it('Should return positive number when multiplying two negatives numbers', () => {
        let result = calc.multiply(-5, -10);

        expect(result).to.equal(50);
    })
});