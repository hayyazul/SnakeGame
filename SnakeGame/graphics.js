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
        this.emptyCellColor = "black";  // `rgb(170 170 170)`;;

        this.previousBoardToDraw = new Array(this.gridWidth * this.gridHeight);  // 1-D array containing the board that was last drawn.
        this.boardToDraw = new Array(this.gridWidth * this.gridHeight);  // 1-D array containing all the index color reference for each cell.
        this.cellColorPalette = [];  // Dynamic dictionary containing number-color pairs. If a new color is seen, then it adds it to this dict.

        this.drawBackground();
    }

    addColorToPalette(color) {
        /*
        Adds a color to the palette, if it hasn't been added already.
        */
        if (!(color in this.cellColorPalette)) { this.cellColorPalette.push(color); };
    }


    drawBackground(color) {
        context.fillStyle = color;
        context.fillRect(0, 0, this.pixelWidth, this.pixelHeight);
    }

    drawGridCell(x, y, color) {
        this.addColorToPalette(color);
        let translated1DCoordinates = y * this.gridWidth + x;

        const isColor = (element) => element === color;
        this.boardToDraw[translated1DCoordinates] = this.cellColorPalette.findIndex(isColor);
    }

    drawEmptyBoard() {
        /* 
          Draws an empty board with all gray cells.

        returns: Null
        */
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                this.drawGridCell(i, j, this.emptyCellColor);
            }
        }
    }

    displaySquare(x, y, size, color) {
        context.fillStyle = color;
        context.fillRect(x, y, size, size);
    }

    displayBoard() {
        /*
            Draws the actual graphics for this.boardToDraw.
        */
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                let boardToDrawIndex = i + j * this.gridWidth;

                let colorIndex = this.boardToDraw[boardToDrawIndex];
                let previousColorIndex = this.previousBoardToDraw[boardToDrawIndex];

                // Check if the current cell is the same color as before; only draw it if it isn't.
                if (colorIndex !== previousColorIndex) {
                    this.displayGridCell(i, j, this.cellColorPalette[colorIndex]);
                    this.previousBoardToDraw[boardToDrawIndex] = colorIndex;  // Update the previous board values as you go.
                }
            }
        }
    }

    displayGridCell(x, y, color) {
        /*
            Given an x and a y (in grid-cell units, not pixels), it draws a square at the appropriate location with the given color.

        x: 0-based index grid coord.
        y: ''
        color: color of grid cell.

        returns: Null
        */

        // Find the topleft corner position of the cell in pixels.
        var topLeftXPos = this.spacing * (x + 1) + x * this.cellSize;
        var topLeftYPos = this.spacing * (y + 1) + y * this.cellSize;

        // Then draw the cell.
        this.displaySquare(topLeftXPos, topLeftYPos, this.cellSize, color);

    }
}