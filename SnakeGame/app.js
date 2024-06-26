'use strict';

var board;
var context;

var width = 10;
var height = 10;

// Initializer function.
window.onload = function () {
    board = document.getElementById("board");
    board.width = width;
    board.height = height; 

    context = board.getContext("2d");

    update()
};

function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height)
}

console.log('Hello world');