function solve() {
    // variables needed for showing winner message
    let player1Score = 0;
    let player2Score = 0;
    let totalTurns = 8; // total turns equals the number of total cards divided by 2
    let winnerDiv = document.createElement('div');
    winnerDiv.id = 'winner';
    document.body.appendChild(winnerDiv);

    //countinue with the original task - revelealing cards
    const [player1, vs, player2] = Array.from(document.getElementById('result').children);
    const historyDiv = document.getElementById('history');
    const [player1Div, res, player2Div] = Array.from(document.getElementsByClassName('cards'))[0].children;
    let currentCards = [null, null]; // [player1's card, player2's card]
    let currentPlayer = null;

    player1Div.addEventListener('click', chooseCard);
    player2Div.addEventListener('click', chooseCard);

    function chooseCard(e) {
        if (e.target.tagName !== 'IMG') {
            return; // ensure that an img was clicked
        }

        if (currentPlayer && currentPlayer === e.currentTarget) {
            return; // prevent a player from selecting more than one card
        }

        currentPlayer = e.currentTarget;
        const currentCard = e.target;
        currentCard.src = 'images/whiteCard.jpg';

        if (currentPlayer === player1Div) {
            player1.textContent = currentCard.name;
            currentCards[0] = currentCard;
        } else {
            player2.textContent = currentCard.name;
            currentCards[1] = currentCard;
        }

        if (player1.textContent && player2.textContent) {
            const winnerIndex = currentCards[0].name > currentCards[1].name ? 0 : 1;
            currentCards[winnerIndex].style.border = '2px solid green';
            currentCards[1 - winnerIndex].style.border = '2px solid red';

            // Update player's score
            winnerIndex === 0 ? player1Score++ : player2Score++;

            historyDiv.textContent += `[${player1.textContent} vs ${player2.textContent}] `;

            // Check if all cards are revealed and display the winner, enable shuffle button
            if (player1Score + player2Score === totalTurns) {
                if (player1Score === player2Score) {
                    winnerDiv.textContent = "It's a draw!";
                } else {
                    winnerDiv.textContent = `Player ${player1Score > player2Score ? 1 : 2} wins!`;
                }

                let shuffleButton = document.querySelector('.shuffleBtn');
                shuffleButton.disabled = false;  // enable the button again when the game ends
            }

            player1.textContent = '';
            player2.textContent = '';
        }
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
    }
}


// function shuffle() {
//     // Creating the shuffle button
//     let shuffleButton = document.createElement('button');
//     shuffleButton.classList.add('shuffleBtn');
//     shuffleButton.textContent = 'Shuffle and start new game!';
//     shuffleButton.disabled = true;
//     document.body.appendChild(shuffleButton);

//     shuffleButton.addEventListener('click', () => {
//         if (shuffleButton.disabled) {
//             return;  // if the button is disabled, do nothing
//         }

//         let player1Div = document.getElementById('player1Div');
//         let player2Div = document.getElementById('player2Div');

//         shuffleCards(player1Div);
//         shuffleCards(player2Div);
//     });

//     function shuffleCards(playerDiv) {
//         const historyDiv = document.getElementById('history');
//         historyDiv.textContent = '';  // clear the history
//         const winnerDiv = document.getElementById('winner');
//         winnerDiv.textContent = '';

//         // Clear playerDiv
//         while (playerDiv.firstChild) {
//             playerDiv.firstChild.remove();
//         }

//         // Generate cards
//         for (let i = 0; i < totalTurns; i++) {
//             let card = document.createElement('img');
//             card.src = 'images/card.jpg';
//             card.name = Math.floor(Math.random() * 15) + 1; // generate random number between 1 and 20 for each card
//             playerDiv.appendChild(card);
//         }

//         // Shuffle the generated cards
//         let cards = Array.from(playerDiv.children);
//         for (let i = cards.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             playerDiv.insertBefore(cards[j], cards[i]);
//         }
//     }
// }
