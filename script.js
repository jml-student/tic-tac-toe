const status = document.querySelector(".status");
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;


const Player = function (sign) {
    let score = 0;
    return {sign, score};
}

const firstPlayer = Player("X");
const secondPlayer = Player("O");
let currentPlayer = firstPlayer;

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
        const status = document.querySelector(".status");
        for (let i = 0; i < winningPatterns.length; i++) {
            let [a, b ,c] = winningPatterns[i];
            if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
                gameActive = false;
                status.textContent = `${currentPlayer.sign} is the winner!`;
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
        status.textContent = `${currentPlayer.sign} turn`;
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    }

    return { checkWin, resetGame };
})();

const cells = document.querySelectorAll(".cell");

cells.forEach((cell, index) => {
    const status = document.querySelector(".status");

    cell.addEventListener("click", () => {
        if (gameActive && board[index] === "") {
                cell.textContent = currentPlayer.sign;
                if (currentPlayer.sign === "X") {
                    cell.setAttribute("style", "color: rgb(223, 145, 0);")
                } else {
                    cell.setAttribute("style", "color: rgb(0, 0, 209);")
                }
                board[index] = currentPlayer.sign;
                Game.checkWin();
                currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
                if (gameActive) {
                    status.textContent = `${currentPlayer.sign} turn`;
                };
            };
        }
    );
});

Game.resetGame();
