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

