const game = (function() {
    const squareEl = document.querySelectorAll('.square');
    const announceWinnerEl = document.querySelector('#announce-winner');
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
        userMark: 'x',
        aiMark: 'o',
        userScore: 0,
        aiScore: 0,
        gameTie: 0,
        currentGameRound: 0
    };

    document.querySelector('.board').addEventListener('click', handleSquareClick);

    function handleSquareClick(event) {
        const square = event.target.closest('.square');
        if (square && square.innerHTML === '' && state.isUserTurn) {
            makeUserMove(square);
            setTimeout(() => {
                aiTurn();
                checkWinner();
            }, 500);
        };
    };

    function makeUserMove(square) {
        if (state.userMark === 'x') {
            gameStatusEl.style.display = 'none';
            const img = document.createElement('img');
            img.src = `./images/${state.userMark}.png`;
            img.width = '90px';
            img.classList.add('cross-image', 'cross');
            square.textContent = '';
            square.appendChild(img)
            state.isUserTurn === false;
        }
    };

    function aiTurn() {
        if (!state.isUserTurn) {
            const boardEl = document.querySelector('board');
            const emptySquares = [...boardEl.children].filter(square => square.innerHTML === '');
    
            if (emptySquares.length > 0) {
                    const randomIndex = Math.floor( Math.random() * emptySquares.length );
                    const chosenSquare = emptySquares[randomIndex];
                    if (state.aiMark === 'o') {
                        const img = document.createElement('img');
                        img.src = `./images/${state.aiMark}.png`;
                        img.width = '90px';
                        img.classList.add('circle-image', 'circle');
                        chosenSquare.textContent = '';
                        chosenSquare.appendChild(img);
                        state.isUserTurn = true;    
                    };
            };

        };
    };

    function checkWinner() { // Checks who the winner is and prints out the result
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            const squareA = squareEl[a].innerHTML;
            const squareB = squareEl[b].innerHTML;
            const squareC = squareEl[c].innerHTML;

            if (squareA === squareB && squareB === squareC && squareA !== '') {
                if (squareA.includes(state.userMark)) {
                    state.userScore++;
                    state.currentGameRound++;
                    showRoundResult('You win!');
                    updateScore(userScoreEl, state.userScore);
                    updateScore(gameRoundEl, state.currentGameRound);

                } else if (squareA.includes(state.aiMark)) {
                    state.aiScore++;
                    state.currentGameRound++;
                    showRoundResult('Computer wins!');
                    updateScore(aiScoreEl, state.aiScore);
                    updateScore(gameRoundEl, state.currentGameRound);
                };
                resetGame();

                if (state.userScore === 3 || state.aiScore === 3) {
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
            showRoundResult(`It's a tie!`)
            updateScore(gameTieEl, state.gameTie)
            updateScore(gameRoundEl, state.currentGameRound);
            resetGame();
        };
    };

    function showRoundResult(message) {
        gameStatusEl.style.display = 'block';
        gameStatusEl.innerHTML = `<h2>${message}</h2>`;
    };

    function updateScore(element, score) {
        element.innerHTML = `<span>${score}</span>`;
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
        });
    };

    function playAgain() {
        location.reload();
    };
    playAgainBtn.addEventListener('click', playAgain);

}) (); // Handles the game logic, determines the winner and increments the scores

