'use strict';


// Globals
var board;
var context;

var graphics;
var game;
var input;
var gameInput;
var gameEnd;

const FPS = 8;
const MS_PER_FRAME = 1000 / FPS;
var current_time = 0;
var previous_frame_time = 0;

const GAMEBOARD_WIDTH = 20;
const GAMEBOARD_HEIGHT = 20;

const sizePerCell = 20;
const spacingBetweenCells = 5;
const width = sizePerCell * GAMEBOARD_WIDTH + spacingBetweenCells * (GAMEBOARD_WIDTH + 1);
const height = sizePerCell * GAMEBOARD_HEIGHT + spacingBetweenCells * (GAMEBOARD_HEIGHT + 1);

var ARRAY_TIME_TO_DRAW = [];
var ARRAY_TIME_TO_UPDATE = [];



// This function runs upon the webpage being opened.
window.onload = function () {
    board = document.getElementById("board");
    board.width = width;
    board.height = height; 

    context = board.getContext("2d");

    graphics = new Graphics(context, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT, sizePerCell, spacingBetweenCells);
    game = new Game(GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
    input = new Input();
    gameInput = new GameInput();
    gameEnd = 0;

    gameLoop();
};

function gameLoop() {


    if (gameEnd === 0) {
        requestAnimationFrame(gameLoop);
    } else if (gameEnd === 1) {
        game.initialize();
        gameInput.initialize();
        input.resetInputStates();
        gameEnd = 0;

        requestAnimationFrame(gameLoop);
    };

    current_time = performance.timeOrigin + performance.now();
    var elapsed_time = current_time - previous_frame_time;

    // if enough time has elapsed, draw the next frame
    if (elapsed_time > MS_PER_FRAME) {
        previous_frame_time = current_time - (elapsed_time % MS_PER_FRAME);  // If the elapsed time is a bit longer, then adjust for that.

        updateInput();

        let timestamp1 = performance.now();
        gameEnd = update();
        let timestamp2 = performance.now();
        draw();
        let timestamp3 = performance.now();

        if (ARRAY_TIME_TO_DRAW.length < 100) {
            ARRAY_TIME_TO_DRAW.push(timestamp3 - timestamp2);
            ARRAY_TIME_TO_UPDATE.push(timestamp2 - timestamp1);
        } else {
            gameEnd = 2;

            var total_draw_time = 0;
            var total_update_time = 0;

            for (let i = 0; i < ARRAY_TIME_TO_DRAW.length; i++) {
                total_draw_time += ARRAY_TIME_TO_DRAW[i];
                total_update_time += ARRAY_TIME_TO_UPDATE[i];
            }

            console.log(`Average time to draw: ${total_draw_time / ARRAY_TIME_TO_DRAW.length} ms`);  // 156ms before optimization, 23.14 ms after.
            console.log(`Average time to update: ${total_update_time / ARRAY_TIME_TO_UPDATE.length} ms`);  // 0.02ms
        }

    }

}

function draw() {
    graphics.drawEmptyBoard();
    game.draw(graphics);

    graphics.displayBoard();
}

function update() {
    return game.update(gameInput);
}

function updateInput() {
    gameInput.update(input);
}