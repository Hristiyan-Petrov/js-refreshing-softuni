function deckPowers(input) {
    let decks = {};

    // Create people decks - they draw sets of cards, apply the new UNIQUE cards every draw 
    for (let line of input) {
        let [name, cards] = line.split(': ');

        // If the deck already exists, use the existing deck, otherwise create a new one
        decks[name] = decks[name] ? decks[name] : [];
        // Set the cards for the deck, ensuring no duplicate cards
        setCards(cards.split(', '), decks[name]);
    }

    // Iterate through each deck and calculate its total power
    for (let name in decks) {
        let totalCardsPower = calculateTotalPower(decks[name]);
        console.log(`${name}: ${totalCardsPower}`);
    }


    function setCards(cards, previousCards) {
        // If there are previous cards, use them, otherwise create a new array
        let result = previousCards ? previousCards : [];

        // Iterate through the new cards
        for (let card of cards) {
            // If card is not already in the deck, add it
            if (!result.includes(card)) {
                result.push(card);
            }
        }

        return result;
    }

    function calculateTotalPower(cards) {
        let total = 0;

        const typeValue = {
            'S': 4,
            'H': 3,
            'D': 2,
            'C': 1
        }

        const powerValue = {
            'J': 11,
            'Q': 12,
            'K': 13,
            'A': 14
        }

        for (let card of cards) {
            // let [power, type] = card.split('');
            let type = card.substring(card.length - 1, card.length);
            let power = card.substring(0, card.length - 1);

            // Checks if card is not a number, then it is J,Q,K or A and apply its value
            if (isNaN(Number(power))) {
                power = powerValue[power];
            }

            // Apply the value of type which represents the card symbol - Hearts/Shades/Clubs/Diamonds
            total += Number(power) * typeValue[type];
        }

        return total;
    }
}

deckPowers([
    'Peter: 2C, 4H, 9H, AS, QS',
    'Tomas: 3H, 10S, JC, KD, 5S, 10S',
    'Andrea: QH, QC, QS, QD',
    'Tomas: 6H, 7S, KC, KD, 5S, 10C',
    'Andrea: QH, QC, JS, JD, JC',
    'Peter: JD, JD, JD, JD, JD, JD'
]
)