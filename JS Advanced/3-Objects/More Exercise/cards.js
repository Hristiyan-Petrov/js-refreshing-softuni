let result = (function() {
    let Suits = {
        SPADES: '\u2660',
        HEARTS: '\u2665',
        DIAMONDS: '\u2666',
        CLUBS: '\u2663',
    }

    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }
        
        set face(newFace) {
            if (!faces.includes(newFace)) {
                throw new Error('Invalid card face: ' + newFace);
            }
            this._face = newFace;
        }

        get suit() {
            return this._suit;
        }

        set suit(newSuit) {
            if (!Object.values(Suits).includes(newSuit)) {
                throw new Error('Invalid card suit: ' + newSuit);
            }
            this._suit = newSuit;
        }
    }

    return {
        Suits: Suits,
        Card: Card
    }
}());

console.log(result);