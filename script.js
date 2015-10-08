/**
 * Created by Kykush Oleh on 02.10.2015.
 */
document.addEventListener("DOMContentLoaded", function () {
    init();
});

function init() {
    ttt = new TicTacToe("pvp");
    generateTile();
}

var winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function TicTacToe(mode) {
    this.mode = typeof mode !== "undefined" ? mode : "pvp";
    this.move = "crossPlayer";
    this.cells = undefined;
    this.toggleMove = function () {
        if (this.move == "crossPlayer") {
            this.move = "noughtPlayer";
            return 0;
        }
        if (this.move == "noughtPlayer") {
            this.move = "crossPlayer";
            return 0;
        }
    }
}

function generateTile() {
    var tile = document.createElement("div");
    tile.className += "tile";
    for (var i = 0; i < 9; i++) {
        var cell = document.createElement("div");
        cell.className += "cell";
        cell.addEventListener("click", handleClick);
        tile.appendChild(cell);
    }
    document.getElementsByClassName("tic-tac-toe")[0].appendChild(tile);
    ttt.cells = document.getElementsByClassName("cell");
}

function handleClick() {
    if (ttt.move == "crossPlayer") {
        this.className += " cross";
    }
    if (ttt.move == "noughtPlayer") {
        this.className += " nought";
    }
    ttt.toggleMove();
    winStateCheck();
    this.removeEventListener('click', handleClick);
}

function winStateCheck() {
    var cells = ttt.cells;

    for (var i = 0; i < 8; i++) {
        var crossWins = (
        cells[winPatterns[i][0]].classList.contains("cross") &&
        cells[winPatterns[i][1]].classList.contains("cross") &&
        cells[winPatterns[i][2]].classList.contains("cross")
        );
        var noughtWins = (
        cells[winPatterns[i][0]].classList.contains("nought") &&
        cells[winPatterns[i][1]].classList.contains("nought") &&
        cells[winPatterns[i][2]].classList.contains("nought")
        );
        if (crossWins) {
            handleWin("Cross");
            return 0;
        }
        if (noughtWins) {
            handleWin("Nought");
            return 0;
        }
    }

    var draw = true;
    for (var j = 0; j < ttt.cells.length; j++){
        if (ttt.cells[j].className == "cell")
            draw = false;
    }
    if (draw){
        handleWin("Friendship");
        return 0;
    }
}

function handleWin(winner){
    alert(winner + " wins");
    for (var i = 0; i < ttt.cells.length; i++){
        ttt.cells[i].removeEventListener("click", handleClick);
    }

}

function startNewGame(){
    document.getElementsByClassName("tile")[0].remove();
    ttt = {};
    init();
}