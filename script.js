const squareEl = document.querySelectorAll('.square');
const selectX = document.querySelector('.select-x');
const selectO = document.querySelector('.select-o');
const announceWinnerEl = document.querySelector('#announce-winner');
const winnerWrapperEl = document.querySelector('.winner-wrapper');
const playAgainBtn = document.querySelector('.play-again-button');
const userScoreEl = document.querySelector('.user-score');
const AIScoreEl = document.querySelector('.AI-score');
const gameTieEl = document.querySelector('.game-tie');
const gameRoundEl = document.querySelector('.game-round');
let isUserTurn = true;
let userMark = '';
let aiMark = '';

const markSquare = (function() {
    let userScore = 0;
    let AIScore = 0;
    let gameTie = 0;
    let currentGameRound = 0;

    selectX.addEventListener('click', () => {
        clearSquare()
        isUserTurn = true;
        userMark = 'x';
        aiMark = 'o';
    });

    selectO.addEventListener('click', () => {
        clearSquare();
        isUserTurn = false;
        userMark = 'o';
        aiMark = 'x';
        setTimeout(aiTurn, 500); // Start with the AI's turn if the user selects 'o'
    });

    squareEl.forEach(e => {
        e.addEventListener('click', () => {
            if (isUserTurn && e.innerHTML === '') {
                if (userMark === 'x') {
                    e.innerHTML = `<img src="./images/x.png" width="100px">`;

                } else if (userMark === 'o') {
                    e.innerHTML = `<img src="./images/o.png" width="100px">`;
                };
                isUserTurn = false;
                setTimeout(() => {
                    aiTurn();
                    checkWinner();
                }, 500);
            };
        });
    }); // Determines the user selection

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            const squareA = squareEl[a].innerHTML;
            const squareB = squareEl[b].innerHTML;
            const squareC = squareEl[c].innerHTML;
    
            if (squareA !== '' && squareA === squareB && squareA === squareC) {
                if (squareA.includes(userMark)) {
                    // getWinner('You win!');
                    userScore++;
                    currentGameRound++;
                    getGameScore(userScoreEl, userScore);
                    getGameScore(gameRoundEl, currentGameRound);

                } else if (squareA.includes(aiMark)) {
                    // getWinner('Computer wins!');
                    AIScore++;
                    currentGameRound++;
                    getGameScore(AIScoreEl, AIScore);
                    getGameScore(gameRoundEl, currentGameRound);
                };
    
                resetGame();

                if (userScore === 5 || AIScore === 5) {
                    setTimeout(() => {
                        announceFinalResult();
                    }, 500);
                };

                return;
            };
        }; // Iterates through the winning conditions array and prints out the winner
    
        if ([...squareEl].every(square => square.innerHTML !== '')) {
            getWinner(`It's a tie!`);
            gameTie++;
            currentGameRound++;
            getGameScore(gameTieEl, gameTie)
            getGameScore(gameRoundEl, currentGameRound);
            resetGame();
        };
    
        function getGameScore(va, el) {
            va.innerHTML = `
                <span>
                    ${el}
                </span>
            `;
        }; // Keeps track of the game score
    
        function getWinner(winner) {
            winnerWrapperEl.innerHTML = '';
            announceWinnerEl.style.display = 'block';
            const winEl = document.createElement('div');
            winEl.innerHTML = `
                    <h2 class="winner">
                        ${winner}
                    </h2>
            `;
            winnerWrapperEl.appendChild(winEl);
        }; // Lets the user know who won

        function announceFinalResult() {
            if (userScore > AIScore) {
                getWinner('You won the game!');
            } else if (AIScore > userScore) {
                getWinner('Computer won the game!');
            };
        };
    
        function playAgain() {
            announceWinnerEl.style.display = 'none';
            location.reload()
        };
        playAgainBtn.addEventListener('click', playAgain);
    
        function resetGame() {
            clearSquare();
            isUserTurn = true;
            userMark = '';
            aiMark = '';
        };    

    }; // Checks who's the winner and prints out the result

    function clearSquare() {
        squareEl.forEach(e => {
            e.innerHTML = '';
        });
    };

}) (); // Handles the user selection and determines the winner

function aiTurn() {
    if (!isUserTurn) {
        const emptySquares = [...squareEl].filter(square => square.innerHTML === '');

        if (emptySquares.length > 0) {
            const randomIndex = Math.floor( Math.random() * emptySquares.length );
            const chosenSquare = emptySquares[randomIndex];
            if (aiMark === 'x') {
                chosenSquare.innerHTML = `<img src="./images/x.png" width="100px">`;

            } else if (aiMark === 'o') {
                chosenSquare.innerHTML = `<img src="./images/o.png" width="100px">`;

            };
            isUserTurn = true;
        };
    };
}; // Handles the AI selection

