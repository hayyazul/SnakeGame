'use strict';


// Globals
var board;
var context;

var graphics;
var game;
var input;
var gameInput;

const FPS = 5;
const MS_PER_FRAME = 1000 / FPS;
var current_time = 0;
var previous_frame_time = 0;

const GAMEBOARD_WIDTH = 10
const GAMEBOARD_HEIGHT = 10;

const sizePerCell = 30;
const spacingBetweenCells = 6;
const width = sizePerCell * GAMEBOARD_WIDTH + spacingBetweenCells * (GAMEBOARD_WIDTH + 1);
const height = sizePerCell * GAMEBOARD_HEIGHT + spacingBetweenCells * (GAMEBOARD_HEIGHT + 1);



// This function runs upon the webpage being opened.
window.onload = function () {
    board = document.getElementById("board");
    board.width = width;
    board.height = height; 

    context = board.getContext("2d");

    graphics = new Graphics(context, width, height, sizePerCell, spacingBetweenCells);
    game = new Game(GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
    input = new Input();
    gameInput = new GameInput();

    gameLoop();
};

function gameLoop() {
    requestAnimationFrame(gameLoop);

    current_time = performance.timeOrigin + performance.now();
    var elapsed_time = current_time - previous_frame_time;

    // if enough time has elapsed, draw the next frame
    if (elapsed_time > MS_PER_FRAME) {
        previous_frame_time = current_time - (elapsed_time % MS_PER_FRAME);  // If the elapsed time is a bit longer, then adjust for that.

        updateInput();
        update();
        draw();
    }
}

function draw() {
    graphics.drawEmptyBoard();
    game.draw(graphics);
}

function update() {
    game.update(gameInput);
}

function updateInput() {
    gameInput.update(input);
}