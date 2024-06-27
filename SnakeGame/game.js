// This file holds game logic.
const vector2 = {
    x: 0,
    y: 0,
    create: function (x, y) {
        const newVector2 = Object.create(this);
        newVector2.x = x;
        newVector2.y = y;
        return newVector2;
    },

    setValues: function (x, y) {
        this.x = x;
        this.y = y;
    },

    copyVector: function (otherVector2) {
        this.x = otherVector2.x;
        this.y = otherVector2.y;
    },

    plusVector: function (otherVector2) {
        let x = this.x + otherVector2.x;
        let y = this.y + otherVector2.y;

        const newVector2 = Object.create(this);
        newVector2.setValues(x, y);

        return newVector2
    },

    plusEqualVector: function (otherVector2) {
        this.x += otherVector2.x;
        this.y += otherVector2.y;
    },

    displayValues: function () {
        console.log(`x: ${this.x} | y: ${this.y} \n`)
    }
}

// TODO: Create snake class.
class Snake {
    /*
     bodyParts: Array containing vector2 coordinates of various body parts.
     moveDelta: vector2 indicating the direction of movement.
    */

    constructor(startingX, startingY) {
        this.bodyParts = [];  // index 0 is the tail, the last index is the head. The game will initialize the start values.
        this.bodyParts.push(vector2.create(startingX, startingY));

        this.moveDelta = vector2.create(0, 0);
    }

    moveSnake() {
        /*
         Moves the snake and its body.
        */

        for (let i = 0; i < this.bodyParts.length - 1; i++) {
            this.bodyParts[i].copyVector(this.bodyParts[i + 1]);
        }
        this.bodyParts[this.bodyParts.length - 1].plusEqualVector(this.moveDelta);
    }
}

// TODO: Create apple structure.

const apple = {
    x: 0,
    y: 0,

    create: function (x, y) {
        this.x = x;
        this.y = y;
    }
}
// TODO: Create game logic class which manages the game
class GameLogic {

    constructor(boardWidth, boardHeight) {
        this.snake = new Snake(randInt(0, boardWidth - 1), randInt(0, boardHeight - 1));
    }
}