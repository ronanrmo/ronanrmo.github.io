'use-strict';

class controller {
    constructor(restartGame) {
        this.upPressed = 0;
        this.downPressed = 0;
        this.leftPressed = 0;
        this.rightPressed = 0;
        this.spacePressed = 0;
        this.restartGame = restartGame;
        this.waitForRestart = false;
    }

    waitGameRestart() {
        this.waitForRestart = true;
    }

    // arrow left	37
    // arrow up	    38
    // arrow right	39
    // arrow down	40
    // space        32

    keyDownEvent(event) {
        if(event.isComposing || event.keyCode == 229)
            return;

        switch(event.keyCode) {
            case 32: this.spacePressed = 1;
                if(this.waitForRestart)
                    this.restartGame();
                break;
            case 37: this.leftPressed = 1;;
                break;
            case 38: this.upPressed = 1;
                break;
            case 39: this.rightPressed = 1;
                break;
            case 40: this.downPressed = 1;
                break;
        }

        //console.log("LeftPressed Key " + this.leftPressed);
    }

    keyUpEvent(event) {
        if(event.isComposing || event.keyCode == 229)
            return;

        //console.log("Up " + event.keyCode);

        switch(event.keyCode) {
            case 32: this.spacePressed = 0;
                break;
            case 37: this.leftPressed = 0;;
                break;
            case 38: this.upPressed = 0;
                break;
            case 39: this.rightPressed = 0;
                break;
            case 40: this.downPressed = 0;
                break;
        }
    }
}

