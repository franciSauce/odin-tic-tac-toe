// Player Factory Function
const Player = function(xo) {
    // DOM Cache
    const cells = document.querySelectorAll(".cell");
    // Methods & Properties
    function _switchTurn() {
        // Switch player after each move
        if (xo === "X") {
            cells.forEach(cell => cell.removeEventListener("click", GameStart.player1.makeMove));
            cells.forEach(cell => cell.addEventListener("click", GameStart.player2.makeMove));
        } else {
            cells.forEach(cell => cell.removeEventListener("click", GameStart.player2.makeMove));
            cells.forEach(cell => cell.addEventListener("click", GameStart.player1.makeMove));
        }
    }
    // Update gameboard array
    function makeMove(e) {
        // Get the cell that was clicked
        const index = e.target.dataset.cellIndex;
        if (GameBoard.gameboard[index]) {
            return;
        } else {
            GameBoard.gameboard.splice(index, 1, xo);
        }
        _switchTurn();
        GameBoard.updateGameboard();
    }
    // Return the Player object
    return {makeMove};
};

// Gameboard Module
const GameBoard = (function() {
    // Methods & Properties
    const gameboard = ["","","","","","","","",""];
    // Display gameboard array on gameboard
    function updateGameboard() {
        Gameboard.gameboard.forEach((element, index) => {
            let cell = document.querySelector(`.cell${index}`);
            cell.textContent = element;
        })
        GameEnd.checkWinner();
    }
    // Return the Gameboard object
    return {gameboard, updateGameboard};
})();

// GameStart Module 
const GameStart = (function() {
    // DOM Cache
    const cells = document.querySelectorAll(".cell");
    const pvpBtn = document.querySelector("#pvp");
    const pvbBtn = document.querySelector("#pvb");
    const p1name = document.querySelector("#p1name");
    const p1input = document.querySelector("#player1");
    const p2name = document.querySelector("#p2name");
    const p2input = document.querySelector("#player2");
    const mainMenuBtn = document.querySelector(".main-menu");
    const resetBtn = document.querySelector(".reset");
    const gameStart = document.querySelector(".game-start");
    const gameStartPVP = document.querySelector(".game-start-pvp");
    const gameStartPVB = document.querySelector(".game-start-pvb");
    const backBtn = document.querySelector(".back");
    const playBtn = document.querySelector(".play");
    const o = document.querySelector("#O");
    // Event Listeners
    resetBtn.addEventListener("click", _resetGameboard);
    backBtn.addEventListener("click", _refreshPage);
    playBtn.addEventListener("click", _startGame);
    pvpBtn.addEventListener("click", _choosePVP);
    pvbBtn.addEventListener("click", _choosePVB);
    mainMenuBtn.addEventListener("click", _refreshPage);
    // Methods & Properties
    const player1 = Player("X");
    const player2 = Player("O");
    // Display player names
    function displayPlayerNames() {
        p1name.textContent = p1input.value;
        p2name.textContent = p2input.value;
    }
    // Player vs Player mode
    function _choosePVP() {
        gameStart.classList.remove("show");
        gameStartPVP.classList.add("show");
    }
    // Player vs Bot mode
    function _choosePVB() {
        gameStart.classList.remove("show");
        gameStartPVB.classList.add("show");
    }
    // Page refresh
    function _refreshPage() {
        window.location.reload();
    }
    // Start Player vs Player game
    function _startGame() {
        if (!p1input.value || !p2input.value) return;
        _displayPlayerNames();
        gameStart.classList.remove("show");
        cells.forEach(cell => cell.addEventListener("click", player1.makeMove));
    }
    // Reset game
    function _resetGameboard() {
        Gameboard.gameboard = ["","","","","","","","",""];
        Gameboard.updateGameboard();
        if (p1input.value) {
            cells.forEach(cell => cell.removeEventListener("click", GameStart.player2.makeMove));
            cells.forEach(cell => cell.addEventListener("click", GameStart.player1.makeMove));
        } else {
            if (o.checked) {
                setTimeout(Animation.opponentMove, "500");
            }
            cells.forEach(cell => cell.addEventListener("click", AI.makeMove));
        }
    }
    // Return player 1 & player 2 object
    return {player1, player2};
})();

// Bot Module
const AI = (function(){
    // DOM Cache
    const cells = document.querySelectorAll(".cell");
    const backBtn = document.querySelector(".back-bot");
    const playBtn = document.querySelector(".play-bot");
    const playerName = document.querySelector("#playerinput");
    const x = document.querySelector("#X");
    const o = document.querySelector("#O");
    const p1name = document.querySelector("#p1name");
    const p2name = document.querySelector("#p2name");
    const gameStartPVB = document.querySelector(".game-start-pvb");
    const gameEnd = document.querySelector(".game-end");
    // Event Listeners
    backBtn.addEventListener("click", _refreshPage);
    playBtn.addEventListener("click", _startGame);
    // Methods & Properties
    // Display player names
    function _displayPlayerNames() {
        if (x.checked) {
            p1name.textContent = playerName.value;
            p2name.textContent = "Bot";
        } else if (o.checked) {
            p1name.textContent = "Bot";
            p2name.textContent = playerName.value;
        }
    }
    // Start Player vs Bot game
    function _startGame() {
        if (!x.checked && !o.checked) return;
        if (!playerName.value) return;
        _displayPlayerNames();
        gameStartPVB.classList.remove("show");
        if (o.checked) {
            setTimeout(opponentMove, "500");
        }
        cells.forEach(cell => cell.addEventListener("click", makeMove));
    }
    // Update gameboard array
    function makeMove(e) {
        const index = e.target.dataset.cellIndex;
        if (GameBoard.gameboard[index]) {
            return;
        } else {
            if (x.checked) {
                GameBoard.gameboard.splice(index, 1, "X");
            } else if (o.checked) {
                GameBoard.gameboard.splice(index, 1, "O");
            }
        }
        GameBoard.updateGameboard();
        cells.forEach(cell => cell.removeEventListener("click", makeMove));
        setTimeout(opponentMove, "500");
    }
    // Bot move
    function opponentMove() {
        if (gameEnd.classList.contains("show")) return;
        let index = Math.floor(Math.random() * 9);
        while (GameBoard.gameboard[index]) {
            index = Math.floor(Math.random() * 9);
        }
        if (x.checked) {
            GameBoard.gameboard.splice(index, 1, "O");
        } else if (o.checked) {
            GameBoard.gameboard.splice(index, 1, "X");
        }
        GameBoard.updateGameboard();
        cells.forEach(cell => cell.addEventListener("click", makeMove));
    }
    // Refresh Page
    function _refreshPage() {
        window.location.reload();
    }
    // Return the Bot object
    return {makeMove, opponentMove};
})();

// GameEnd Module
const GameEnd = (function() {
    // DOM Cache
    const cells = document.querySelectorAll(".cell");
    const winner = document.querySelector(".game-end");
    const backBtn = document.querySelector(".back-end");
    const resetBtn = document.querySelector(".reset-end");
    const menuBtn = document.querySelector(".refresh-end");
    const announce = document.querySelector(".announce");
    const p1input = document.querySelector("#player1");
    const p2input = document.querySelector("#player2");
    const playerName = document.querySelector("#playerinput");
    const x = document.querySelector("#X");
    const o = document.querySelector("#O");
    // Event Listeners
    backBtn.addEventListener("click", _closeWinner);
    resetBtn.addEventListener("click", _resetGameboard);
    menuBtn.addEventListener("click", _refreshPage);
    // Methods & Properties
    // Check for winner

})