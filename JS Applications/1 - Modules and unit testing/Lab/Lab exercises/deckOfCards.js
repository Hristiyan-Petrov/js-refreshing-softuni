function printDeckOfCards(cards) {
    function Card(face, suit) {

        const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        const suits = ['S', 'H', 'D', 'C'];

        let errorMEssage = `Invalid card: ${face}${suit}`;

        // Uppercase checks and Valid values checks

        if (face !== face.toUpperCase() ||
            suit !== suit.toUpperCase() ||
            !faces.includes(face) ||
            !suits.includes(suit)) {
            throw new Error(errorMEssage);
        }

        function setSuite(value) {
            switch (value) {
                case 'S':
                    return '\u2660';

                case 'H':
                    return '\u2665';

                case 'D':
                    return '\u2666';

                case 'C':
                    return '\u2663';
            }
        }

        return {
            get face() {
                return face
            },
            set face(newFace) {
                if (!faces.includes(newFace)) {
                    throw new Error(faceError);
                }
                face = newFace;
            },
            get suit() {
                return setSuite(suit);
                // return suit;
            },
            set suit(newSuit) {
                if (!suits.includes(newSuit)) {
                    throw new Error(suitError);
                }
                suit = newSuit;
            },
            toString: function () {
                return this.face + this.suit;
            }
        }
    }

    // Card Sequence 
    let sequence = [];

    for (let cardValues of cards) {
        let [face, suit] = cardValues.length === 3 ? [cardValues.substring(0, 2), cardValues.substring(2)] : cardValues.split('');

        try {
            let currCard = Card(face, suit);
            sequence.push(currCard.toString());
        } catch (error) {
            return error.message;
        }
    }

    return sequence.join(' ');
}

let result = printDeckOfCards(['5S', '3D', 'QD', '1C']);
console.log(result);

module.exports = printDeckOfCards;