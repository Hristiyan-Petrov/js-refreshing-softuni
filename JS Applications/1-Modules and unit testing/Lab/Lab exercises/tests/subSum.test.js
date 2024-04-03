const assert = require('chai').assert;
const sumElements = require('../subSum.js');

describe('Summing elements from start to end index in an array', () => {
    it('If the first element is not an array, return NaN', () => {
        // Arrange
        let array = 'text';
        let startIndex = 0;
        let endIndex = 2;

        // Act
        let result = sumElements(array, startIndex, endIndex);

        // Assert
        assert.isNaN(NaN);
    });

    it('If an element from the calculated array elements is not of type number, return NaN', () => {

        // Arrange
        let array = [10, 'twenty', 30, 40];
        let startIndex = 0;
        let endIndex = 2;

        // Act
        let result = sumElements(array, startIndex, endIndex);

        // Assert
        assert.isNaN(result)
    });

    it('If the start index is less than zero, consider its value to be a zero', () => {
        // Arrange
        let array = [1.1, 2.2, 3.3, 4.4, 5.5];
        let startIndex = -3;
        let endIndex = 1;

        // Act
        let result = sumElements(array, startIndex, endIndex);

        // Assert
        assert.equal(result, 3.3);
    });

    it('If the end index is outside the bounds of the array, assume it points to the last index of the array', () => {

        // Arrange
        let array = [10, 20, 30, 40, 50, 60];
        let startIndex = 3;
        let endIndex = 300;

        // Act
        let result = sumElements(array, startIndex, endIndex);

        // Assert
        assert.equal(result, 150);
    });

    it('If the array is empty, return zero', () => {

        // Arrange
        let array = [];
        let startIndex = 1;
        let endIndex = 2;

        // Act
        let result = sumElements(array, startIndex, endIndex);

        // Assert
        assert.equal(result, 0);
    });
});