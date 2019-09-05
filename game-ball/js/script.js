// import myGameArea from './myGameArea.js'


let myUpBtn = document.getElementById('myUpBtn');
let myDownBtn = document.getElementById('myDownBtn');
let myLeftBtn = document.getElementById('myLeftBtn');
let myRightBtn = document.getElementById('myRightBtn');


let myGamePiece;
let myGameGod;


let initalGame = {
    startGame() {
        myGameArea.start();
        myGamePiece = new mainPlayerGame(30, 30, "red", myGameArea.canvas.width / 2 - 25, myGameArea.canvas.height / 2 - 25);
        myGameGod = new godPlayerGame(30, 30, "black", 20, 30);
        this.addEventToBtn(myUpBtn, 'Y', -0.5, -5, 0)
        this.addEventToBtn(myDownBtn, 'Y', 0.5, 5, 0)
        this.addEventToBtn(myLeftBtn, 'X', -0.5, -5, 0)
        this.addEventToBtn(myRightBtn, 'X', 0.5, 5, 0)
    },
    addEventToBtn(el, axis, gravity, run, stop) {
        el.onclick = () => {
            if (axis === 'Y') {
                myGamePiece.speedY = run;
                myGamePiece.gravityY = gravity;
            } else {
                myGamePiece.speedX = run;
                myGamePiece.gravityX = gravity;
            }
            setTimeout(()=>{ 
                if (axis === 'Y') {
                    myGamePiece.speedY = stop;
                } else {
                    myGamePiece.speedX = stop;
                }
             }, 100);
        }

        // el.onmousedown = () => {
        //     if (axis === 'Y') {
        //         myGamePiece.speedY = run;
        //         myGamePiece.gravityY = gravity;
        //     } else {
        //         myGamePiece.speedX = run;
        //         myGamePiece.gravityX = gravity;
        //     }
        // }
        // el.onmouseup = () => {
        //     if (axis === 'Y') {
        //         myGamePiece.speedY = stop;
        //     } else {
        //         myGamePiece.speedX = stop;
        //     }
        // }
        // el.onmouseleave = () => {
        //     if (axis === 'Y') {
        //         myGamePiece.speedY = stop;
        //     } else {
        //         myGamePiece.speedX = stop;
        //     }
        // }
        // el.ontouchstart = () => {
        //     if (axis === 'Y') {
        //         myGamePiece.speedY = run;
        //         myGamePiece.gravityY = gravity;
        //     } else {
        //         myGamePiece.speedX = run;
        //         myGamePiece.gravityX = gravity;
        //     }
        // }
        // el.ontouchend = () => {
        //     if (axis === 'Y') {
        //         myGamePiece.speedY = stop;
        //     } else {
        //         myGamePiece.speedX = stop;
        //     }
        // }
    }
}


let myGameArea = {
    wrapGame: document.getElementById("wrapGame"),
    canvas: document.createElement("canvas"),
    start() {
        if (window.innerWidth > 767) {
            this.canvas.width = 700;
        } else {
            this.canvas.width = window.innerWidth;
        }
        this.canvas.height = 470;
        this.context = this.canvas.getContext("2d");
        this.wrapGame.insertBefore(this.canvas, this.wrapGame.childNodes[0]);
        this.interval = setInterval(this.updateGameArea, 20);
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    updateGameArea() {
        myGameArea.clear();
        myGamePiece.newPos();
        myGamePiece.update();
        myGameGod.newPos();
        myGameGod.update();
    }
}



class mainPlayerGame {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.gravityY = 0;
        this.gravityX = 0;
        this.gravitySpeedX = 0;
        this.gravitySpeedY = 0;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    update() {
        let ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    newPos() {
        this.x += this.speedX + this.gravityXF;
        this.y += this.speedY + this.gravityYF;

        if (this.x >= myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y >= myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height
        }
        if (this.y <= 0) {
            this.y = 0;
        }
    }
    get gravityXF() {
        if (this.speedX != 0) {
            this.gravitySpeedX += this.gravityX;
            return this.gravitySpeedX
        }
        if (this.speedX == 0) {
            if (this.gravityX < 0) {
                if (this.gravitySpeedX != 0)
                    this.gravitySpeedX -= this.gravityX / 4;
            }
            if (this.gravityX > 0) {
                if (this.gravitySpeedX != 0)
                    this.gravitySpeedX -= this.gravityX / 4;
            }
            return this.gravitySpeedX;
        }
        return 0
    }
    get gravityYF() {
        if (this.speedY != 0) {
            this.gravitySpeedY += this.gravityY;
            return this.gravitySpeedY
        }
        if (this.speedY == 0) {
            if (this.gravityY < 0) {
                if (this.gravitySpeedY != 0)
                    this.gravitySpeedY -= this.gravityY / 4;
            }
            if (this.gravityY > 0) {
                if (this.gravitySpeedY != 0)
                    this.gravitySpeedY -= this.gravityY / 4;
            }
            return this.gravitySpeedY;
        }
        return 0
    }
}
class godPlayerGame {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 2;
        this.speedY = 2;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    update() {
        let ctx = myGameArea.context;
        if (this.LocationCheck) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            this.width = 0;
            this.height = 0;
        }
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x >= myGameArea.canvas.width - this.width) {
            this.speedX = -this.speedX;
        }
        if (this.x <= 0) {
            this.speedX = -this.speedX;
        }
        if (this.y >= myGameArea.canvas.height - this.height) {
            this.speedY = -this.speedY;
        }
        if (this.y <= 0) {
            this.speedY = -this.speedY;
        }
        // this.LocationCheck()
    }
    get LocationCheck() {
        let myleft = this.x;
        let myright = this.x + this.width;
        let mytop = this.y;
        let mybottom = this.y + this.height;
        let otherleft = myGamePiece.x;
        let otherright = myGamePiece.x + myGamePiece.width;
        let othertop = myGamePiece.y;
        let otherbottom = myGamePiece.y + myGamePiece.height;
        let crash = false;
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            crash = true;
        }
        return crash;
    }
}
initalGame.startGame();