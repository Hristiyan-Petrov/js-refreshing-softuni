function solve() {
    // variables needed for showing winner message
    let player1Score = 0;
    let player2Score = 0;
    let totalTurns = 8; // total turns equals the number of total cards divided by 2
    let winnerDiv = document.createElement('div');
    winnerDiv.id = 'winner';
    document.body.appendChild(winnerDiv);

    //continue with the original task - revealing cards
    const [player1, vs, player2] = Array.from(document.getElementById('result').children);
    const historyDiv = document.getElementById('history');
    const [player1Div, res, player2Div] = Array.from(document.getElementsByClassName('cards'))[0].children;
    let currentCards = [null, null]; // [player1's card, player2's card]
    let currentPlayer = null;

    player1Div.addEventListener('click', chooseCard);
    player2Div.addEventListener('click', chooseCard);

    // Create the shuffle button and its event listener here
    let shuffleButton = document.createElement('button');
    shuffleButton.classList.add('shuffleBtn');
    shuffleButton.textContent = 'Shuffle and start new game!';
    shuffleButton.disabled = true;
    document.body.appendChild(shuffleButton);

    shuffleButton.addEventListener('click', () => {
        if (shuffleButton.disabled) {
            return;  // if the button is disabled, do nothing
        }
        resetGame();
        shuffleButton.disabled = true;

        shuffleCards(player1Div);
        shuffleCards(player2Div);
    });

    // Define the shuffleCards function here
    function shuffleCards(playerDiv) {
        const historyDiv = document.getElementById('history');
        historyDiv.textContent = '';  // clear the history
        const winnerDiv = document.getElementById('winner');
        winnerDiv.textContent = '';

        // Clear playerDiv
        while (playerDiv.firstChild) {
            playerDiv.firstChild.remove();
        }

        // Generate cards
        for (let i = 0; i < totalTurns; i++) {
            let card = document.createElement('img');
            card.src = 'images/card.jpg';
            card.name = Math.floor(Math.random() * 15) + 1; // generate random number between 1 and 20 for each card
            playerDiv.appendChild(card);
        }

        // Shuffle the generated cards
        let cards = Array.from(playerDiv.children);
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            playerDiv.insertBefore(cards[j], cards[i]);
        }
    }

    // Define the resetGame function here
    function resetGame() {
        const [player1, vs, player2] = Array.from(document.getElementById('result').children);
        player1.textContent = '';
        player2.textContent = '';
        if (currentCards[0]) {
            currentCards[0].src = 'images/card.jpg';
            currentCards[0].style.border = '';
        }
        if (currentCards[1]) {
            currentCards[1].src = 'images/card.jpg';
            currentCards[1].style.border = '';
        }
        currentCards = [null, null];
        currentPlayer = null;

        // If a game has finished, reset scores and hide the winner message
        if (player1Score + player2Score === totalTurns) {
            player1Score = 0;
            player2Score = 0;
            winnerDiv.textContent = '';
        }

        if (player1Score + player2Score === totalTurns) {
            shuffleButton.disabled = false;  // enable the shuffle button when game ends
        }
    }

    function shuffle() {
        let shuffleButton = document.createElement('button');
        shuffleButton.classList.add('shuffleBtn');
        shuffleButton.textContent = 'Shuffle and start new game!';
        shuffleButton.disabled = true;
        document.body.appendChild(shuffleButton);

        shuffleButton.addEventListener('click', () => {
            if (shuffleButton.disabled) {
                return;  // if the button is disabled, do nothing
            }

            resetGame();
            shuffleButton.disabled = true;

            let player1Div = document.getElementById('player1Div');
            let player2Div = document.getElementById('player2Div');

            shuffleCards(player1Div);
            shuffleCards(player2Div);
        });
    }
}