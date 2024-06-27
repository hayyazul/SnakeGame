'use strict';


// Globals
var board;
var gameBoard;
var context;
var graphics;

const GAMEBOARD_WIDTH = 10
const GAMEBOARD_HEIGHT = 10;

const sizePerCell = 30;
const spacingBetweenCells = 6;
// Gameboard globals
var width = sizePerCell * GAMEBOARD_WIDTH + spacingBetweenCells * (GAMEBOARD_WIDTH + 1);
var height = sizePerCell * GAMEBOARD_HEIGHT + spacingBetweenCells * (GAMEBOARD_HEIGHT + 1);

// Helper functions
function randInt(min, max) {
    /* 
      Generates a random integer between min and max inclusive. 
    returns: A random int x s.t. min <= x <= max.
    */
    return Math.round(Math.random() * (max - min)) + min;
}

function removeElementFromArray(array, elementValue) {
    /*
      Removes the first instance of an element within an array.
    returns: Updated array.
    */

    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}

function removeElementAtIndex(array, index) {
    if (index >= 0 && index < array.length) {
        array.splice(index, 1);
    }
    return array;
}

// This function runs upon the webpage being opened.
window.onload = function () {
    board = document.getElementById("board");
    board.width = width;
    board.height = height; 

    context = board.getContext("2d");

    graphics = new Graphics(context, width, height, sizePerCell, spacingBetweenCells);
    gameBoard = new GameBoard(GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);

    update()
    draw()
};

function draw() {
    graphics.drawEmptyBoard();
    gameBoard.draw(graphics);

}

function update() {
}
