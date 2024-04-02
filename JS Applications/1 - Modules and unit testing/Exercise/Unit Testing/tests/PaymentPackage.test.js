const assert = require('chai').assert;
const PaymentPackage = require('../apps/PaymentPackage');

describe('PaymentPackage', () => {

    it('should initialize properly', () => {
        let pp = new PaymentPackage('Test', 100);
        assert.equal(pp.name, 'Test');
        assert.equal(pp.value, 100);
        assert.equal(pp.VAT, 20);
        assert.equal(pp.active, true);
    });

    it('should throw error when name is not a string', () => {
        assert.throws(() => new PaymentPackage(100, 100), 'Name must be a non-empty string');
    });

    it('should throw error when name is empty string', () => {
        assert.throws(() => new PaymentPackage('', 100), 'Name must be a non-empty string');
    });

    it('should throw error when value is not a number', () => {
        assert.throws(() => new PaymentPackage('Test', 'abc'), 'Value must be a non-negative number');
    });

    it('should throw error when value is negative number', () => {
        assert.throws(() => new PaymentPackage('Test', -5), 'Value must be a non-negative number');
    });

    it('should throw error when VAT is not a number', () => {
        let pp = new PaymentPackage('Test', 100);
        assert.throws(() => pp.VAT = 'abc', 'VAT must be a non-negative number');
    });

    it('should throw error when VAT is negative number', () => {
        let pp = new PaymentPackage('Test', 100);
        assert.throws(() => pp.VAT = -5, 'VAT must be a non-negative number');
    });

    it('should throw error when active is not a boolean', () => {
        let pp = new PaymentPackage('Test', 100);
        assert.throws(() => pp.active = 'abc', 'Active status must be a boolean');
    });

    it('should print correctly when package is active', () => {
        let pp = new PaymentPackage('Test', 100);
        assert.equal(pp.toString(), 'Package: Test\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120');
    });

    it('should print correctly when package is inactive', () => {
        let pp = new PaymentPackage('Test', 100);
        pp.active = false;
        assert.equal(pp.toString(), 'Package: Test (inactive)\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120');
    });

});