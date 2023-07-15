const squareEl = document.querySelectorAll('.square');
const selectX = document.querySelector('.select-x');
const selectO = document.querySelector('.select-o');
let isUserTurn = true;
let userMark = '';
let aiMark = '';

(function markSquare() {
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
        setTimeout(aiTurn, 1000); // Start with the AI's turn if the user selects 'o'
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
                }, 1000);
            };
        });
    });

}) (); // Handles the user selection

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

function checkWinner() {
    const winningConditions = [
        [0, 1, 3], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        const squareA = squareEl[a].innerHTML;
        const squareB = squareEl[b].innerHTML;
        const squareC = squareEl[c].innerHTML;

        if (squareA !== '' && squareA === squareB && squareA === squareC) {
            if (squareA.includes('x')) {
                alert('You win!');
            } else if (squareA.includes('o')) {
                alert('AI wins!');
            };
            resetGame();
            return;
        };
    };

    if ([...squareEl].every(square => square.innerHTML !== '')) {
        alert(`It's a tie`);
        resetGame();
    };
}; // Checks who's the winner and prints out the result

function clearSquare() {
    squareEl.forEach(e => {
        e.innerHTML = '';
    });
};

function resetGame() {
    clearSquare();
    isUserTurn = true;
    userMark = '';
    aiMark = '';
};
