// Write tests with mocha and chai assert for the following task:
// Create a JS factory function that returns a Card object to hold a card’s face and suit, both set through the constructor. Throw an error if the card is initialized with invalid face or suit or if an attempt is made to change the face or suit of an existing instance to an invalid value.
// •	Valid card faces are: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
// •	Valid card suits are: S (♠), H (♥), D (♦), C (♣)
// Both face and suit are expected as an uppercase string. The class also needs to have a toString() method that prints the card’s face and suit as a string. Use the following UTF code literals to represent the suits:
// •	\u2660 – Spades (♠)
// •	\u2665 – Hearts (♥)
// •	\u2666 – Diamonds (♦)
// •	\u2663 – Clubs (♣)

const assert = require('chai').assert;
const Card = require('../playingCards');

describe('Card Factory Function', () => {
    it('should return a card object with valid face and suit', () => {
        let card = Card('A', 'S');

        assert.typeOf(card, 'object');
        assert.equal(card.face, 'A');
        assert.equal(card.suit, '\u2660');
        assert.equal(card.toString(), 'A\u2660');
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
