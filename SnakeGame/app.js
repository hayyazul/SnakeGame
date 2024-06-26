'use strict';


// Globals
var board;
var context;
var graphics;

const GAMEBOARD_WIDTH = 10
const GAMEBOARD_HEIGHT = 10;

const sizePerCell = 30;
const spacingBetweenCells = 6;
// Gameboard globals
var width = sizePerCell * GAMEBOARD_WIDTH + spacingBetweenCells * (GAMEBOARD_WIDTH + 1);
var height = sizePerCell * GAMEBOARD_HEIGHT + spacingBetweenCells * (GAMEBOARD_HEIGHT + 1);



// This function runs upon the webpage being opened.
window.onload = function () {
    board = document.getElementById("board");
    board.width = width;
    board.height = height; 

    context = board.getContext("2d");

    graphics = new Graphics(context, width, height, sizePerCell, spacingBetweenCells);

    update()
};



function update() {
    graphics.drawBackground("black");
    graphics.drawEmptyBoard();
}
