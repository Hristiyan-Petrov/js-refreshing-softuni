const assert = require('chai').assert;
const createCalculator = require('../addSubstract');

describe('createCalculator function', () => {
    it('should return a module (object)', () => {
        let calculator = createCalculator();
        assert.isObject(calculator);
    });

    it('should contain the functions add(), subtract() and get() as properties', () => {
        let calculator = createCalculator();
        assert.isFunction(calculator.add);
        assert.isFunction(calculator.subtract);
        assert.isFunction(calculator.get);
    });

    it("should keep an internal sum that can't be modified from the outside", () => {
        let calculator = createCalculator();
        calculator.value = 100;
        assert.equal(calculator.get(), 0);
    });

    it('should not add or subtract NaNs', () => {
        let calculator = createCalculator();
        calculator.add('hello');
        assert.isNaN(calculator.get());
        calculator.subtract('world');
        assert.isNaN(calculator.get());
    });

    it('the function get() should return the value of the internal sum', () => {
        let calculator = createCalculator();
        calculator.add(5);
        calculator.add(17);
        calculator.subtract(2);
        assert.equal(calculator.get(), 20);
    });
});