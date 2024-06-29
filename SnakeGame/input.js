class Input {
    /* 
      Organization of user input (keys, etc.);
    */
    constructor() {
        this.keyDownStates = {
            'ArrowUp': false,
            'ArrowDown': false,
            'ArrowLeft': false,
            'ArrowRight': false
        };

        this.currentKeyPressed = null;
        this.previousKeyPressed = null;

        document.addEventListener('keydown', this.KeyPressedHandler.bind(this));
        document.addEventListener('keyup', this.KeyUpHandler.bind(this));

    }

    KeyPressedHandler(event) {
        let keyPressed = event.key;

        this.previousKeyPressed = this.currentKeyPressed;
        this.currentKeyPressed = keyPressed
        if (keyPressed in this.keyDownStates) {
            this.keyDownStates[keyPressed] = true;
        }
    }

    KeyUpHandler(event) {
        let keyPressed = event.key;
        if (keyPressed in this.keyDownStates) {
            this.keyDownStates[keyPressed] = false;
        }
    }
}

class GameInput {
    constructor() {
        this.directionToChangeTo = 'none';
    }

    update(input) {
        const keyToDirection = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowRight': 'right',
            'ArrowLeft': 'left'
        };

        if (input.currentKeyPressed in keyToDirection) {
            this.directionToChangeTo = keyToDirection[input.currentKeyPressed];
        } else {
            this.directionToChangeTo = "none";
        }
    }

}