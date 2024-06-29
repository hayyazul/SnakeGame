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

    isEqualToVector: function (otherVector2) {
        return this.x === otherVector2.x && this.y === otherVector2.y;
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
        this.direction = "none";
    }

    get headIndex() {
        return this.bodyParts.length - 1;
    }

    changeDirection(newDirection) {
        /*
          Changes the moveDelta of the snake and its direction, assuming the new direction isn't a 180 turn.
        direction: string indicating which direction to change to.
        */
        const oppositeDirections = {
            "up": "down",
            "down": "up",
            "left": "right",
            "right": "left"
        };

        let oppositeDirection = oppositeDirections[this.direction];

        if (newDirection !== oppositeDirection) {
            switch (newDirection) {
                case ("up"):
                    this.moveDelta.setValues(0, -1);
                    break;
                case ("down"):
                    this.moveDelta.setValues(0, 1)
                    break;
                case ("left"):
                    this.moveDelta.setValues(-1, 0);
                    break;
                case ("right"):
                    this.moveDelta.setValues(1, 0);
                    break;
                case ("stop"):
                    this.moveDelta.setValues(0, 0);
                    break;
            }

            this.direction = newDirection;
        }

    }

    grow() {
        /*
         Increases length of snake by 1.
        */

        // -1, -1 aren't valid coordinates, but they will be set to the coordinates of the tail when the moveSnake function is called.
        this.bodyParts.unshift(vector2.create(-1, -1));
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

    update(directionInput, hasEaten) {
        this.changeDirection(directionInput);
        if (hasEaten) {
            this.grow();
        }
        this.moveSnake();
    }

    draw(graphics) {
        for (let i = 0; i < this.bodyParts.length; i++) {
            graphics.drawGridCell(this.bodyParts[i].x, this.bodyParts[i].y, 'green');
        }
    }
}

// TODO: Create apple structure.

const apple = {
    coordinates: vector2.create(0, 0),

    create: function (x, y) {
        const newApple = Object.create(this);
        newApple.coordinates = vector2.create(x, y);

        return newApple;
    },

    draw: function (graphics) {
        graphics.drawGridCell(this.coordinates.x, this.coordinates.y, 'red');
    }
}
// TODO: Create game logic class which manages the game
class Game {

    constructor(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;

        this.snake = new Snake(randInt(0, boardWidth - 1), randInt(0, boardHeight - 1));
        this.apple = apple.create(randInt(0, boardWidth - 1), randInt(0, boardHeight - 1))
        this.isAppleEaten = false;

        var appleIsOnSnake = this.apple.coordinates.isEqualToVector(this.snake.bodyParts[0]);

        while (appleIsOnSnake) {
            apple.coordinates.setValues(randInt(0, boardWidth - 1), randInt(0, boardHeight - 1));
            appleIsOnSnake = this.apple.coordinates.isEqualToVector(this.snake.bodyParts[0]);
        }
    }

    update(gameInput) {
        if (this.isSnakeHeadOnApple) {
            this.isAppleEaten = true;
            this.regenerateApple();
        } else {
            this.isAppleEaten = false;
        }

        this.snake.update(gameInput.directionToChangeTo, this.isAppleEaten);
    }

    get isSnakeHeadOnApple() {
        return this.snake.bodyParts[this.snake.headIndex].isEqualToVector(this.apple.coordinates);
    }

    get unoccupiedCellsCoordinates() {
        // Get all valid coordinates.
        var unoccupiedCellCoordinates = new Set();
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                unoccupiedCellCoordinates.add(vector2.create(i, j));
            }
        }

        // Then "subtract" away the cells which are occupied.
        unoccupiedCellCoordinates.subtractSet(this.occupiedCellCoordinates);
        return unoccupiedCellCoordinates;
    }

    get occupiedCellCoordinates() {
        var occupiedCellCoordinates = new Set();

        // Include the entire body of the snake.
        for (let i = 0; i < this.snake.bodyParts.length; i++) {
            occupiedCellCoordinates.add(this.snake.bodyParts[i]);
        }

        // Then the apple.
        occupiedCellCoordinates.add(this.apple.coordinates);

        return occupiedCellCoordinates;
    }

    isCellOccupied(cellCoordinates) {

        // First check if the apple occupies the coordinate.
        if (cellCoordinates.isEqualToVector(this.apple.coordinates)) {
            return true;
        }

        // Then if the snake does.
        for (let i = 0; i < this.snake.bodyParts.length; i++) {
            if (cellCoordinates.isEqualToVector(this.snake.bodyParts[i])) {
                return true;
            }
        }

        // If neither cells occupy the given coordinate, 
        return false;
    }

    regenerateApple() {
        let vacantCells = getSetEntries(this.unoccupiedCellsCoordinates);

        if (vacantCells.length !== 0) {
            let randomVacantCellIndex = randInt(1, vacantCells.length) - 1;

            let randomCoordinate = vacantCells[randomVacantCellIndex];

            this.apple.coordinates.copyVector(randomCoordinate);
        } else {
            // If there are no vacant cells, the game should have ended by now. A placeholder value is put instead.
            this.apple.coordinates.setValues(-1, -1);
        }

    }

    draw(graphics) {
        this.apple.draw(graphics);
        this.snake.draw(graphics);
    }
}