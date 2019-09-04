let myUpBtn = document.getElementById('myUpBtn');
let myDownBtn = document.getElementById('myDownBtn');
let myLeftBtn = document.getElementById('myLeftBtn');
let myRightBtn = document.getElementById('myRightBtn');


function startGame() {
    myGameArea.start();
    myGamePiece = new mainPlayerGame(50, 50, "red", myGameArea.canvas.width / 2 - 25, myGameArea.canvas.height / 2 - 25);
    myGameGod = new godPlayerGame(50, 50, "black", 20, 30);
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
        this.interval = setInterval(updateGameArea, 20);
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}



class mainPlayerGame {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0;
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
        this.x += this.speedX + this.gravityX;
        this.y += this.speedY + this.gravityY;
        console.log(this.gravityX)
        // console.log(this.y)
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
    get gravityX(){
       if(this.speedX != 0){
        this.gravitySpeedX += this.gravity;
        return this.gravitySpeedX
       } 
       if(this.speedX == 0){
           if(this.gravity < 0){
            if(this.gravitySpeedX != 0)
            this.gravitySpeedX -= this.gravity
           }
           if(this.gravity > 0){
               if(this.gravitySpeedX != 0)
                this.gravitySpeedX -= this.gravity
           }
        return this.gravitySpeedX
    }
       return 0
    }
    get gravityY(){
        if(this.speedY != 0){
         this.gravitySpeedY += this.gravity;
         return this.gravitySpeedY
        } 
        if(this.speedY == 0){
            if(this.gravity < 0){
             if(this.gravitySpeedY != 0)
             this.gravitySpeedY -= this.gravity
            }
            if(this.gravity > 0){
                if(this.gravitySpeedY != 0)
                 this.gravitySpeedY -= this.gravity
            }
         return this.gravitySpeedY
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
startGame();


function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    myGameGod.newPos();
    myGameGod.update();
}


addEventToBtn = (el, axis, gravity, run, stop) => {
    el.onmousedown = () => {
        if (axis === 'Y') {
            myGamePiece.speedY = run;
            myGamePiece.gravity = gravity;
        } else {
            myGamePiece.speedX = run;
            myGamePiece.gravity = gravity;
        }
    }
    el.onmouseup = () => {
        if (axis === 'Y') {
            myGamePiece.speedY = stop;
        } else {
            myGamePiece.speedX = stop;
        }
    }
    // el.ontouchstart = () => {
    //     if (axis === 'Y') {
    //         myGamePiece.speedY = run;
    //     } else {
    //         myGamePiece.speedX = run;
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
addEventToBtn(myUpBtn, 'Y', -0.5, -1, 0)
addEventToBtn(myDownBtn, 'Y', 0.5, 1, 0)
addEventToBtn(myLeftBtn, 'X', -0.5, -1, 0)
addEventToBtn(myRightBtn, 'X', 0.5, 1, 0)