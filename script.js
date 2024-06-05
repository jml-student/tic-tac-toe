let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const cells = document.querySelectorAll(".cell");

const Player = function (sign) {
    let score = 0;
    return {sign, score};
}

const firstPlayer = Player("X");
const secondPlayer = Player("O");
let currentPlayer = firstPlayer;

const Game = (function () {
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
                status.textContent = `${currentPlayer.sign} is the winner!`;
                cells[a].style.border = "3px solid green";
                cells[a].style.boxShadow = "green 0px 0px 5px 3px";
                cells[b].style.border = "3px solid green";
                cells[b].style.boxShadow = "green 0px 0px 5px 3px";
                cells[c].style.border = "3px solid green";
                cells[c].style.boxShadow = "green 0px 0px 5px 3px";
                currentPlayer.score++;
                displayScores();
                gameActive = false;
                setTimeout(() => {
                    newTurn();
                    clearStyles();
                }, 2000);
                break;
            };
        }
    };

    const clearStyles = () => {
        for (let cell of cells) {
            cell.style.border = "";
            cell.style.boxShadow = "";
        }
    };

    const newTurn = () => {
        gameActive = true;
        const status = document.querySelector(".status");
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = firstPlayer;
        status.textContent = `${currentPlayer.sign} turn`;
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    }

    const resetGame = () => {
        const status = document.querySelector(".status");
        board = ["", "", "", "", "", "", "", "", ""];
        firstPlayer.score = 0;
        secondPlayer.score = 0;
        displayScores();
        currentPlayer = firstPlayer;
        status.textContent = `${currentPlayer.sign} turn`;
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
    }

    return { checkWin, clearStyles, newTurn, resetGame};

})();

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
                }
            };
        }
    );
});

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
    if (gameActive) {
        Game.resetGame();
    }
});

Game.resetGame();
