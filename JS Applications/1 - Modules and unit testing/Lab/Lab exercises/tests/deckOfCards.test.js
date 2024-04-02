const assert = require('chai').assert;
const printDeckOfCards = require('../deckOfCards');

describe('function printDeckOfCards', () => {
    it('should take a deck of cards as an array of strings and print them as a sequence of cards (space separated)', () => {
        let array = ['AS', '10D', 'KH', '2C'];
        let result = printDeckOfCards(array);
        assert.equal(result, 'A♠ 10♦ K♥ 2♣');
    })

    it('should return "Invalid card: [card]" when an invalid card definition is passed as input', () => {
        let array = ['5S', '3D', 'QD', '1C'];
        let result = printDeckOfCards(array);
        assert.equal(result, 'Invalid card: 1C');
        // assert.throws(() => printDeckOfCards(array), 'Invalid card: 1C');
    })
});