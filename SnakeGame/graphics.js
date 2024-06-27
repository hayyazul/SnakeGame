class Graphics {
    constructor(context, width, height, sizePerCell, spacingBetweenCells) {
        this.context = context;

        this.gridWidth = width
        this.gridHeight = height

        // Dimensions of entire canvas in pixels.
        this.pixelWidth = (sizePerCell + spacingBetweenCells) * this.gridWidth + spacingBetweenCells;
        this.pixelHeight = (sizePerCell + spacingBetweenCells) * this.gridHeight + spacingBetweenCells;

        this.cellSize = sizePerCell;
        this.spacing = spacingBetweenCells;

        this.backgroundColor = "black";
        this.emptyCellColor = `rgb(170 170 170)`;;
    }

    drawBackground(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, this.pixelWidth, this.pixelHeight);
    }

    drawSquare(x, y, size, color) {

        context.fillStyle = color;
        context.fillRect(x, y, size, size);
    }

    drawGridCell(x, y, color) {
        /*
            Given an x and a y (in grid-cell units, not pixels), it draws a square at the appropriate location with the given color.

        x: 0-based index grid coord.
        y: ''
        color: color of grid cell.

        returns: Null
        */

        if (color === "red") {
            console.log(x);
            console.log(y);
        }

        // Find the topleft corner position of the cell in pixels.
        var topLeftXPos = this.spacing * (x + 1) + x * this.cellSize;
        var topLeftYPos = this.spacing * (y + 1) + y * this.cellSize;

        // Then draw the cell.
        this.drawSquare(topLeftXPos, topLeftYPos, this.cellSize, color);

    }

    drawEmptyBoard() {
        /* 
          Draws an empty board with all gray cells.

        returns: Null
        */
        this.drawBackground("black");
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                this.drawGridCell(i, j, this.emptyCellColor);
            }
        }
    }
}