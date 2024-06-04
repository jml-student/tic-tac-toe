const status = document.querySelector(".status");
const cells = document.querySelectorAll(".cell");

const Player = function (sign) {
    return {sign};
}

const Game = (function () {
    const status = document.querySelector(".status");
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    const firstPlayer = Player("X");
    const secondPlayer = Player("O");
    let currentPlayer = firstPlayer;


    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = firstPlayer;
        gameActive = true;
        status.textContent = "First player's turn";
    }

    return {resetGame};
})();

