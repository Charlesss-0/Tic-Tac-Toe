const game = (function() {
    const squareEl = document.querySelectorAll('.square');
    const announceWinnerEl = document.querySelector('#announce-winner');
    const winnerWrapperEl = document.querySelector('.winner-wrapper');
    const playAgainBtn = document.querySelector('.play-again-button');
    const gameStatusEl = document.querySelector('.game-status');
    const userScoreEl = document.querySelector('.user-score');
    const AIScoreEl = document.querySelector('.AI-score');
    const gameTieEl = document.querySelector('.game-tie');
    const gameRoundEl = document.querySelector('.game-round');

    let isUserTurn = true;
    let userMark = 'x'
    let aiMark = 'o'
    let userScore = 0;
    let AIScore = 0;
    let gameTie = 0;
    let currentGameRound = 0;

    document.querySelector('.board').addEventListener('click', (event) => {
        const square = event.target.closest('.square');
        if (square && square.innerHTML === '' && isUserTurn === true) {
            userMark = 'x'
            gameStatusEl.style.display = 'none';
            square.innerHTML = `<img src="./images/x.png" width="90px" class="cross-image">`;
            isUserTurn = false;
            setTimeout(() => {
                aiTurn();
                checkWinner();
            }, 500);
        };
    });

    function checkWinner() { // Checks who the winner is and prints out the result
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
                    userScore++;
                    currentGameRound++;
                    showRoundResult('You win!');
                    getGameScore(userScoreEl, userScore);
                    getGameScore(gameRoundEl, currentGameRound);

                } else if (squareA.includes(aiMark)) {
                    AIScore++;
                    currentGameRound++;
                    showRoundResult('Computer wins!');
                    getGameScore(AIScoreEl, AIScore);
                    getGameScore(gameRoundEl, currentGameRound);
                };
                resetGame();

                if (userScore === 3 || AIScore === 3) {
                    setTimeout(() => {
                        announceFinalResult();
                    }, 500);
                };

            };
        };

        if ([...squareEl].every(square => square.innerHTML !== '')) {
            gameTie++;
            currentGameRound++;
            showRoundResult(`It's a tie!`)
            getGameScore(gameTieEl, gameTie)
            getGameScore(gameRoundEl, currentGameRound);
            resetGame();
        };    

        function showRoundResult(el) {
            gameStatusEl.style.display = 'block';
            gameStatusEl.innerHTML = `
                <h2>
                    ${el}
                </h2>
            `;
        };

        function getGameScore(va, el) {
            va.innerHTML = `
                <span>
                    ${el}
                </span>
            `;
        };

        function announceFinalResult() {
            if (userScore > AIScore) {
                document.body.classList.add('show-before');
                getWinner('You won the game!');

            } else if (AIScore > userScore) {
                document.body.classList.add('show-before');
                getWinner('Computer won the game!');
            };
        };

    };

    function getWinner(winner) {
        announceWinnerEl.style.display = 'block';
        const winEl = document.createElement('div');
        winEl.innerHTML = `
                <h2 class="winner">
                    ${winner}
                </h2>
        `;
        winnerWrapperEl.appendChild(winEl);
    }; // Lets the user know who won

    function playAgain() {
        announceWinnerEl.style.display = 'none';
        location.reload();
    };
    playAgainBtn.addEventListener('click', playAgain);

    function resetGame() {
        squareEl.forEach(e => {
            e.innerHTML = '';
        })
        isUserTurn = true;
    };

    function aiTurn() {
        if (!isUserTurn) {
            const emptySquares = [...squareEl].filter(square => square.innerHTML === '');
    
            if (emptySquares.length > 0) {
                const randomIndex = Math.floor( Math.random() * emptySquares.length );
                const chosenSquare = emptySquares[randomIndex];
                aiMark = 'o';
                chosenSquare.innerHTML = `<img src="./images/o.png" width="90px" class="circle-image">`;
                isUserTurn = true;
            };
        };
    }; // Handles the AI selection

}) (); // Handles the game logic, determines the winner and increments the scores

