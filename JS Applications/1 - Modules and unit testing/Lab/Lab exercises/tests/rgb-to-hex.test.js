const assert = require('chai').assert;
const rgbToHexColor = require('../rgb-to-hex');

describe('RGB to Hex Color', () => {
    it('should take three integer numbers, each within range [0…255]', () => {
        assert.doesNotThrow(() => rgbToHexColor(255, 255, 255), TypeError);
    });
    
    it('should return the same color in hexadecimal for given RGB format as a string ', () => {
        let result = rgbToHexColor(79, 92, 137);
        assert.equal(result, '#4F5C89');
        assert.isString(result);
    });

    it('should return undefined if any of the input parameters are of invalid type or not in the expected range', () => {
        assert.isUndefined(rgbToHexColor('ana', 92, 137));
        assert.isUndefined(rgbToHexColor(79, 'aka', 137));
        assert.isUndefined(rgbToHexColor(79, 92, 'aba'));
    });

    it('should return undefined if any of the input parameters are not in the expected range', () => {
        assert.isUndefined(rgbToHexColor(260, 92, 137));
        assert.isUndefined(rgbToHexColor(79, 260, 137));
        assert.isUndefined(rgbToHexColor(79, 92, 260));
    });
});