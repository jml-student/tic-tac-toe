const status = document.querySelector(".status");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = firstPlayer;
let gameActive = true;


const Player = function (sign) {
    let score = 0;
    return {sign};
}

const firstPlayer = Player("X");
const secondPlayer = Player("O");

const Game = (function () {
    const status = document.querySelector(".status");

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function displayScores() {
        const firstScore = document.querySelector(".first-score");
        const secondScore = document.querySelector(".second-score");
        firstScore.textContent = firstPlayer.score;
        secondScore.textContent = secondPlayer.score;
    };

    const checkWin = () => {
        for (let i = 0; i < winningPatterns.length; i++) {
            let [a, b ,c] = winningPatterns[i];
            if (board[a] === board[b] && board[b] === board[c]) {
                gameActive = false;
                status.textContent = `${currentPlayer} is the winner!`;
                currentPlayer.score++;
                displayScores();
                break;
            };
        }
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = firstPlayer;
        gameActive = true;
        status.textContent = `${currentPlayer}'s turn`;
    }

    return {checkWin, resetGame};
})();

const cells = document.querySelectorAll(".cell");

cells.forEach((cell, index) => {
    const status = document.querySelector(".status");
    if (gameActive === true) {
        cell.addEventListener("click", () => {
            cells[index].textContent = `${currentPlayer}`;
            board[index] = currentPlayer;
            Game.checkWin();
            currentPlayer = "X" ? "O" : "X";
            status.textContent = `${currentPlayer}'s turn`;
        });
    };
});
