const squareEl = document.querySelectorAll('.square');
const selectX = document.querySelector('.select-x');
const selectO = document.querySelector('.select-o');

(function markSquare() { // Let the user mark a square with selected option
    selectX.addEventListener('click', () => {
        squareEl.forEach(e => {
            e.addEventListener('click', () => {
                if (e.innerText === '' || e.innerText === `<img src="./images/x.png" width="50px">`) {
                    e.innerHTML = `<img src="./images/x.png" width="50px">`

                } else if (e.innerText !== '' && e.innerText === `<img src="./images/o.png" width="50px">`) {
                    e.innerHTML = `<img src="./images/o.png" width=""50px>`
                };
            });
        });
    });

    selectO.addEventListener('click', () => {
        squareEl.forEach(e => {
            e.addEventListener('click', () => {
                if (e.innerText === '' || e.innerText === `<img src="./images/o.png" width="50px">`) {
                    e.innerHTML = `<img src="./images/o.png" width="50px">`

                } else if (e.innerText !== '' && e.innerText === `<img src="./images/x.png" width="50px">`) {
                    e.innerHTML = `<img src="./images/x.png" width="50px">`
                }; 
            });
        });
    });

}) ();

class KeepScore {
    constructor(round, user, computer) {
        this.round = round
        this.user = user
        this.computer = computer
    }
}