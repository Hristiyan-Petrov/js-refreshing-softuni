const assert = require('chai').assert;
const lookupChar = require('../apps/charLookup');

describe('lookupChar function', () => {
    it('should return undefined when passing a non-string as first parameter', () => {
        assert.isUndefined(lookupChar(5, 5));
    });

    it('should return undefined when passing a non-number as second parameter', () => {
        assert.isUndefined(lookupChar('some string', 'not a number'));
    });

    it('should return undefined when passing a a fractional (floating-point) number as first parameter', () => {
        assert.isUndefined(lookupChar('some other string', 5.5));
    });
    
    it('should return "Incorrect index" when passing a number bigger than the string length', () => {
        assert.equal(lookupChar('Chrystal', 15), 'Incorrect index');
    });
    
    it('should return "Incorrect index" when passing a number equalt to the string length', () => {
        assert.equal(lookupChar( 'Cave', 4), 'Incorrect index');
    });
    
    it('should return "Incorrect index" when passing a negative number', () => {
        assert.equal(lookupChar('Barometer', -5), 'Incorrect index');
    });
    
    it('should return "Incorrect index" when passing a negative number', () => {
        assert.equal(lookupChar('Barometer', -5), 'Incorrect index');
    });
    
    it('should return return correct value when passing correct arguments', () => {
        assert.equal(lookupChar('Hris', 0), 'H');
        assert.equal(lookupChar('Bearfighter', 7), 'h');
    });
});