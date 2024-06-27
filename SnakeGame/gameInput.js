class Input {
    constructor() {
        this.keysPressed = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        }

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        if (event.key in this.keysPressed) {
            event.preventDefault();
            this.keysPressed[event.key] = true;
        }
        console.log(this.keysPressed)
    }

    handleKeyUp(event) {
        if (event.key in this.keysPressed) {
            event.preventDefault();
            this.keysPressed[event.key] = false;
        }
    }
}

class GameInput {
    constructor() {
        this.direction = 'no change';
    }

    updateInput(input) {
        if (input.keysPressed['w']) {
            this.direction = 'up';
        } else if (input.keysPressed['a']) {
            this.direction = 'left';
        } else if (input.keysPressed['s']) {
            this.direction = 'down';
        } else if (input.keysPressed['d']) {
            this.direction = 'right';
        } else {
            this.direction = 'no change';
        }
    }
}