// Globals
var board;
var gameBoard;
var input;
var gameInput;
var context;
var graphics;

var lastTime = 0;
const desiredFPS = 5;
const frameTime = 1000 / desiredFPS; // Time per frame in milliseconds

const GAMEBOARD_WIDTH = 10;
const GAMEBOARD_HEIGHT = 10;

const sizePerCell = 30;
const spacingBetweenCells = 6;

// Game board globals
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

    const index = array.indexOf(elementValue);
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
    input = new Input();
    gameInput = new GameInput();

    // Start the game loop
    requestAnimationFrame(gameLoop);
};

function draw() {
    graphics.drawEmptyBoard();
    gameBoard.draw(graphics);
}

function update() {
    // Update input.
    gameInput.updateInput(input);

    // Then update the game.
    return gameBoard.update(gameInput.direction);
}

function gameLoop() {

    // Calculate elapsed time since last frame
    timestamp = performance.now();
    let elapsed = timestamp - lastTime;

    // Check if enough time has elapsed to update/draw
    let gameEnd = false;

    if (elapsed > frameTime) {
        lastTime = timestamp - (elapsed % frameTime);

        // Update game logic
        gameEnd = update();

        // Draw game state
        draw();
    }

    if (gameEnd) {
        console.log("Game over!");
        return null;
    }

    requestAnimationFrame(gameLoop);

}
