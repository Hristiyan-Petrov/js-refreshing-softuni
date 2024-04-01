function Card(face, suit) {

    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const suits = ['S', 'H', 'D', 'C'];

    let faceError = 'Invalid face declaration!';
    let suitError = 'Invalid suit declaration!';

    if (!faces.includes(face)) {
        throw new Error(faceError);
    }

    if (!suits.includes(suit)) {
        throw new Error(suitError);
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
        suit,
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
            console.log(this.face, this.suit);
        }
    }
}

let card1 = Card('A', 'S');
card1.suit = 'C';
card1.toString();