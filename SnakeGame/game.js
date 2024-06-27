
/* 1-D Coordinates: Coordinates which treat the grid as a 1-D line; this is done by adding a position's x coordinate by y * width.*/

class Apple {
    constructor() {
        /*
          The Apple is an object the snake can "eat," which increases its length.

        returns: Null
        */
        this.x = -1;
        this.y = -1;

        this.isEaten = false;
    }

    placeApple(x, y) {
        this.x = x;
        this.y = y;
    }

    eaten() {
        this.isEaten = true;
    }

    draw(graphics) {
        graphics.drawGridCell(this.x, this.y, 'red');
    }
}


class Snake {
    constructor(startingX, startingY) {
        this.headX = startingX;
        this.headY = startingY;

        this.direction = 'stationary';
        this.dx = 0;
        this.dy = 0;

        this.snakeColor = 'green';

        // An array containing 2-element arrays denoting the x and y position of the body part, with index 0 being the tail.
        this.bodyCoordinates = [];

        this.isDead = false;
        this.hasEaten = false;
    }

    updateDirection(direction) {
        /*
          Changes the direction of the snake, assuming it isn't a 180 turn.

        direction: string denoting which direction to send the snake in.
        
        returns: Null
        */
        const directionMap = {
            'up': { dx: 0, dy: -1 },
            'down': { dx: 0, dy: 1 },
            'right': { dx: 1, dy: 0 },
            'left': { dx: -1, dy: 0 }
        };

        const oppositeDirection = {
            'up': 'down',
            'down': 'up',
            'right': 'left',
            'left': 'right'
        }[this.direction];

        if (direction !== oppositeDirection && direction !== 'no change') {
            const { dx, dy } = directionMap[direction];
            this.dx = dx;
            this.dy = dy;
            this.direction = direction;
        }

    }

    updatePosition() {
        /*
          Updates the coordinates of the entire snake, including the body.
        returns: Null
        */

        // The body part should take the position of the part infront of it.
        for (let i = this.bodyCoordinates.length - 1; i > 0; i--) {
            this.bodyCoordinates[i] = this.bodyCoordinates[i - 1];
        }

        this.bodyCoordinates[0][0] = this.headX;
        this.bodyCoordinates[0][1] = this.headY;

        this.moveHead();
    }

    moveHead() {
        this.headX += this.dx;
        this.headY += this.dy;
    }

    draw(graphics) {
        graphics.drawGridCell(this.headX, this.headY, this.snakeColor);
        for (let i = 0; i < this.bodyCoordinates.length; i++) {
            graphics.drawGridCell(this.bodyCoordinates[i][0], this.bodyCoordinates[i][1], this.snakeColor);
        }
    }

    updateSize(appleX, appleY) {
        /* 
          Increases the size of the snake if it has eaten.
        */
        if (this.checkIfWillBeOnApple(appleX, appleY)) {
            this.bodyCoordinates.push([-1, -1]);
            this.hasEaten = true;
        } else {
            this.hasEaten = false;
        }
    }

    get nextTickHeadPosition() {
        return [this.headX + this.dx, this.headY + this.dy];
    }

    checkIfWillBeOnApple(appleX, appleY) {
        /*
          Checks if the snake will be on the apple next tick. or in
        */
        var nextTickHeadCoords = this.nextTickHeadPosition();

        if (nextTickHeadCoords[0] === appleX && nextTickHeadCoords[1] === appleY) {
            return true;
        }

        return false;
    }

    checkIfWillCollideWithBorder(width, height) {
        var nextTickHeadCoords = this.nextTickHeadPosition();

        let hitLeftBorder = nextTickHeadCoords[0] < 0;
        let hitTopBorder = nextTickHeadCoords[1] < 0;
        let hitRightBorder = nextTickHeadCoords[0] >= width;
        let hitBottomBorder = nextTickHeadCoords[1] >= height;

        if (hitLeftBorder || hitTopBorder || hitRightBorder || hitBottomBorder) {
            return true;
        }

    }

    checkIfWillCollideWithWall(wallCellCoords) {
        var nextTickHeadCoords = this.nextTickHeadPosition();

        if (wallCellCoords.includes(nextTickHeadCoords)) {
            return true;
        }
        return false;
    }

    updateDeath(width, height, wallCellCoords) {
        this.isDead = this.checkIfWillCollideWithBorder(width, height) || this.checkIfWillCollideWithWall(wallCellCoords);
    }

    setDead() {
        this.isDead = true;
    }

    update(direction, width, height, wallCellCoords, appleX, appleY) {
        /* 
          Updates all values associated with snake (size, body, position, etc.)
        
        returns: false if alive, true if dead.
        */
        if (this.isDead) {
            return true;

        } else {
            // First, change the direction of the snake.
            this.updateDirection(direction);
            // Then update the snake's death state.
            this.updateDeath(width, height, wallCellCoords);
            // Then update the snake's eaten state.
            this.updateSize(appleX, appleY);
            // Finally, update its position.
            this.updatePosition();

            return false;
        }
    }
}


// TODO: Refactoring
class GameBoard {
    constructor(w, h) {
        /*
          This class contains information about the game board.

        w: In grid units.
        h: ''

        returns: Null
        */
        this.width = w;
        this.height = h;
        this.numberOfCells = this.width * this.height;

        this.unavailableCells = [];

        // Optional array containing non-border wall cells, if any at all.
        this.wallCells = [];

        this.apple = new Apple();
        this.snake = new Snake();

        // Initializations.
        this.initializeGameVariables();
        this.initializeUnavailableCells();
        
    }

    getRandomAvailableCell() {
        /*
          Finds a random available cell and its coordinates.
        returns: Array containing random x and y coordinate of an available cell.
        */
        var availableCellCount = this.numberOfCells - this.unavailableCells.length;
        
        let randomAvailableCellIndex = randInt(0, availableCellCount)
        var cellIndex = 0;
        var i = 0;
        while (i < randomAvailableCellIndex) {
            if (this.unavailableCells.includes(i)) {

            } else {
                i++;
            }

            cellIndex++;
        }

        return [cellIndex % this.width, Math.floor(cellIndex / this.width)];
    }

    // TODO: Refactor this out of a lot of places, make unavailableCells in 2D instead of 1D coords..
    convert2DCoordsTo1D(x, y) {
        return y * width + x;
    }

    removeWallCell(indexToRemove) {
        /* 
          Removes the wall cell with the given index.

        indicesToRemove: index of the wallCells to remove.
        returns: Null
        */

        if (0 <= indexToRemove && indexToRemove < this.wallCells.length) {
            wallCell1DCoordinates = this.convert2DCoordsTo1D(this.wallCells[indexToRemove][0], this.wallCells[indexToRemove][1]);
            removeElementAtIndex(this.wallCells, indexToRemove);
            removeElementFromArray(this.update, wallCell1DCoordinates);

        }

    }

    addWallCell(coordinateOfNewWallCell) {
        this.wallCells.push(coordinateOfNewWallCell);
        this.unavailableCells.push(this.convert2DCoordsTo1D(coordinateOfNewWallCell[0], coordinateOfNewWallCell[1]))
    }

    removeUnavailableCells() {
        /* Finds the cells which have been deoccupied by the snake and apple.*/

        // If the snake has eaten, then the tail of the snake does not change position because the snake grew, so do not remove it in this case.
        if (this.snake.hasEaten) {
            apple1DCoordinate = this.convert2DCoordsTo1D(this.apple.x, this.apple.y);
            this.unavailableCells = removeElementFromArray(this.unavailableCells, apple1DCoordinate);

        } else {
            tail1DCoordinate = this.convert2DCoordsTo1D(this.snake.bodyCoordinates[-1][0], this.snake.bodyCoordinates[-1][1]);
            this.unavailableCells = removeElementFromArray(this.unavailableCells, tail1DCoordinate);
        }
    }

    addUnavailableCells() {
        /*
          Adds new unavailable cells. Note that this does not initialize all unavailable cells, so only call this when updating the game.
        */
        this.unavailableCells.push(this.convert2DCoordsTo1D(this.snake.headX, this.snake.headY));
    }

    updateUnavailableCells() {
        this.removeUnavailableCells();
        this.addUnavailableCells();
    }

    initializeUnavailableCells() {
        this.unavailableCells = [];

        this.unavailableCells.push(this.convert2DCoordsTo1D(this.apple.x, this.apple.y));
        this.unavailableCells.push(this.convert2DCoordsTo1D(this.snake.headX, this.snake.headY));
        for (let i = 0; i < this.snake.bodyCoordinates.length; i++) {
            this.unavailableCells.push(this.convert2DCoordsTo1D(this.snake.bodyCoordinates[i]));
        }

        for (let i = 0; i < this.wallCells.length; i++) {
            this.unavailableCells.push(this.wallCells[i]);
        }

    }

    initializeGameVariables() {
        let snakeCoords = this.getRandomAvailableCell();
        this.snake.headX = snakeCoords[0];
        this.snake.headY = snakeCoords[1];

        this.regenerateApple();
    }

    regenerateApple() {
        var newAppleCoord = this.getRandomAvailableCell();
        this.apple.placeApple(newAppleCoord[0], newAppleCoord[1]);

        this.unavailableCells.push(this.convert2DCoordsTo1D(newAppleCoord[0], newAppleCoord[1]));
        this.apple.isEaten = false;
    }

    update(gameInput) {
        let gameEnd = this.snake.update(gameInput,
            this.width, this.heigh,
            this.wallCells,
            this.apple.x, this.apple.y);

        if (this.snake.hasEaten) {
            this.apple.eaten();
        }

        this.updateUnavailableCells();

        if (this.apple.isEaten) {
            this.regenerateApple();
        }

        if (this.snake.bodyCoordinates.length + 1 === this.width * this.height) {
            return 2;
        }
 
        return gameEnd;
    }

    draw(graphics) {
        this.snake.draw(graphics);
        this.apple.draw(graphics);
    }
}