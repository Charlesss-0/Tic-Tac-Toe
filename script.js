const game = (function() {
    const squareEl = document.querySelectorAll('.square');
    const announceWinnerEl = document.getElementById('announce-winner');
    const winnerWrapperEl = document.querySelector('.winner-wrapper');
    const playAgainBtn = document.querySelector('.play-again-button');
    const gameStatusEl = document.querySelector('.game-status');
    const userScoreEl = document.querySelector('.user-score');
    const aiScoreEl = document.querySelector('.AI-score');
    const gameTieEl = document.querySelector('.game-tie');
    const gameRoundEl = document.querySelector('.game-round');

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const state = {
        isUserTurn: true,
        userScore: 0,
        aiScore: 0,
        gameTie: 0,
        currentGameRound: 0
    };

    document.querySelector('.board').addEventListener('click', handleSquareClick);

    function handleSquareClick(event) {
        const square = event.target.closest('.square');
        if (square && square.innerHTML === '' && state.isUserTurn === true) {
            if (state.isUserTurn) {
                gameStatusEl.style.display = 'none';
                makeMove(square, 'x', 'cross');
                state.isUserTurn = false;
                setTimeout(() => {
                    aiTurn();
                    checkWinner();
                }, 1000);    
            };
        };
    };

    function makeMove(square, mark, cls) {
        square.innerHTML = `<img src="./images/${mark}.png" width="90px" class="${cls}-image ${cls}">`;
    };

    function aiTurn() {
        if (!state.isUserTurn) {
            const emptySquares = [...squareEl].filter(square => square.innerHTML === '');
    
            if (emptySquares.length > 0) {
                const randomIndex = Math.floor( Math.random() * emptySquares.length );
                const chosenSquare = emptySquares[randomIndex];
                makeMove(chosenSquare, 'o', 'circle');
                state.isUserTurn = true;
            };
        };
    }; // Handles the AI selection

    function checkWinner() { // Checks who the winner is and prints out the result
        const board = [...squareEl].map(square => square.innerHTML);
    
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            const squareA = board[a];
            const squareB = board[b];
            const squareC = board[c];

            if (squareA !== '' && squareA === squareB && squareB === squareC) {
                if (squareA.includes('cross') && squareB.includes('cross')) {
                    state.userScore++;
                    state.currentGameRound++;
                    showRoundResult('You win!');
                    updateScore(userScoreEl, state.userScore);
                    updateScore(gameRoundEl, state.currentGameRound);

                } else if (squareA.includes('circle') && squareB.includes('circle')) {
                    state.aiScore++;
                    state.currentGameRound++;
                    showRoundResult('Computer Wins!');
                    updateScore(aiScoreEl, state.aiScore);
                    updateScore(gameRoundEl, state.currentGameRound);
                }
                resetGame();

                if (state.userScore === 5 || state.aiScore === 5) {
                    setTimeout(() => {
                        announceFinalResult();
                    }, 500);
                };
                return;
                
            };
        };

        if ([...squareEl].every(square => square.innerHTML !== '')) {
            state.gameTie++;
            state.currentGameRound++;
            showRoundResult(`It's a tie!`);
            updateScore(gameTieEl, state.gameTie);
            updateScore(gameRoundEl, state.currentGameRound);
            resetGame();
        };    
    };

    function showRoundResult(message) {
        gameStatusEl.style.display = 'block';
        gameStatusEl.innerHTML = `<h2>${message}</h2>`;
    };

    function updateScore(element, message) {
        element.innerHTML = `<span>${message}</span>`;
    };

    function announceFinalResult() {
        if (state.userScore > state.aiScore) {
            document.body.classList.add('show-before');
            getWinner('You won the game!');

        } else if (state.aiScore > state.userScore) {
            document.body.classList.add('show-before');
            getWinner('Computer won the game!');
        };
    };

    function getWinner(winner) {
        announceWinnerEl.style.display = 'block';
        const winEl = document.createElement('div');
        winEl.innerHTML = `<h2 class="winner">${winner}</h2>`;
        winnerWrapperEl.appendChild(winEl);
    };

    function resetGame() {
        squareEl.forEach(e => {
            e.innerHTML = '';
        })
        state.isUserTurn = true;
    };

    function playAgain() {
        location.reload();
    };
    playAgainBtn.addEventListener('click', playAgain);

}) (); // Handles the game logic, determines the winner and increments the scores

