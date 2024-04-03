const assert = require('chai').assert;
const Card = require('../playingCards');

describe('Card Factory Function', () => {
    it('should return a card object with valid face and suit', () => {
        let card = Card('A', 'S');

        assert.typeOf(card, 'object');
        assert.equal(card.face, 'A');
        assert.equal(card.suit, '\u2660');
    });

    it('should throw an error when card is initialized with invalid face', () => {
        assert.throws(() => Card('B', 'S'), 'Invalid face declaration!');
    });

    it('should throw an error when card is initialized with invalid suit', () => {
        assert.throws(() => Card('5', '5'), 'Invalid suit declaration!');
    });

    it('should thow an error if an attempt is made to change the face of an existing instance to an invalid value', () => {
        let card = Card('A', 'S');
        assert.throw(() => { card.face = 'C' }, 'Invalid face declaration!');
    });

    it('should thow an error if an attempt is made to change the suit of an existing instance to an invalid value', () => {
        let card = Card('A', 'S');
        assert.throw(() => { card.suit = '5' }, 'Invalid suit declaration!');
    });

    it('should change face and suit to valid values', () => {
        let card = Card('A', 'S');
        card.face = 'K';
        card.suit = 'H';
        assert.equal(card.toString(), 'K\u2665');
    });

    it('should recieve face and suit input as Uppercase strings', () => {
        assert.throws(() => Card('A', 'h'), 'Invalid suit declaration!');
        assert.throws(() => Card('a', 'H'), 'Invalid face declaration!');
    });
});
