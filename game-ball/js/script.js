// import myGameArea from './myGameArea.js'


let myUpBtn = document.getElementById('myUpBtn');
let myDownBtn = document.getElementById('myDownBtn');
let myLeftBtn = document.getElementById('myLeftBtn');
let myRightBtn = document.getElementById('myRightBtn');


let myGamePiece;
let myGameGod;
let asd;



let initalGame = {
    startGame() {
        myGameArea.start();
        myGamePiece = new mainPlayerGame(40, 40, './img/smill.png', myGameArea.canvas.width / 2 - 25, myGameArea.canvas.height / 2 - 25);
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
            setTimeout(() => {
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
        myGameGod.newPos();
        initalParticles.updateParticles();
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
        this.image = new Image();
        this.image.src = color;
        // this.color = color;
        this.x = x;
        this.y = y;
    }
    update() {
        let ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
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
        this.update()
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
        this.ctx = myGameArea.context
    }
    update() {
        if (this.LocationCheck) {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            // this.drowParticles()

        } else {
            this.width = 0;
            this.height = 0;
            initalParticles.intervalParticles();
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
        this.update()
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
// const projectiles = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', ];

const initalParticles = {
    arrParticles: [],
    testArr: 0,
    intervalParticles(){
        // setInterval(() => {
        //     if (this.testArr > this.arrParticles.length - 1) {
        //         this.testArr = 0
        //     }
        //     this.arrParticles.push({a:new drowParticles(myGameGod.x, myGameGod.y)})
        //     // this.arrParticles[this.testArr].a = new drowParticles(myGameGod.x, myGameGod.y);
        //     console.log(this.testArr)
        //     this.testArr++
        //     }, 50)
        for(let x = 0; x < 5; x++){
            this.arrParticles.push({a:new drowParticles(myGameGod.x, myGameGod.y)})
        }
    },
    updateParticles(){
        // alert()
        for (let x in this.arrParticles) {
            if (this.arrParticles[x].a) {
                this.arrParticles[x].a.move()
            }
        }
    }

}

class drowParticles {
    constructor(x, y) {
        this.ctx = myGameArea.context
        this.direction = Math.floor(Math.random() * 180) + 180;
        this.emoji = '▞';
        this.size = Math.random() * 10 + 10;
        this.direction = Math.floor(Math.random() * 180) + 180;
        this.angle = 0;
        this.x = x + myGameGod.width / 2;
        this.y = y + myGameGod.height / 2;
        this.spin = 0.2;
        this.life = 60;
        this.maxLife = 60;
        this.alpha = this.life / this.maxLife
    }
    move() {
        this.life -= 0.8;
        var speed = 8;
        var toRadians = this.direction / 180 * 3 * Math.PI;
        this.x += speed * Math.cos(toRadians)
        this.y += speed * Math.sin(toRadians)
        this.angle += this.spin
        this.drawEmoji()
    }
    drawEmoji() {
        this.ctx.font = this.size + "px Arial"
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.save(); /// To restore the state later on using ctx.restore();
        this.ctx.globalAlpha = this.alpha || 1;
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle)
        this.ctx.fillText(this.emoji, 0, 0);
        this.ctx.restore();
        //restoring state  
    }

}
initalGame.startGame();