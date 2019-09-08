// import myGameArea from './myGameArea.js'


let myUpBtn = document.getElementById('myUpBtn');
let myDownBtn = document.getElementById('myDownBtn');
let myLeftBtn = document.getElementById('myLeftBtn');
let myRightBtn = document.getElementById('myRightBtn');


let myGamePiece;
// let myGameGod;


let initalGame = {
    startGame() {
        myGameArea.start();
        myGamePiece = new mainPlayerGame(40, 40, './img/smill.png', myGameArea.canvas.width / 2 - 25, myGameArea.canvas.height / 2 - 25);
        // initalParticles.createNewBadPlayer();
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
        // myGameGod.newPos();
        initalParticles.update();
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
        // console.log(this.gravitySpeedX)
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
    constructor(width, height, color, x, y, id) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.speedX = 3;
        this.speedY = 3;
        this.image = new Image();
        this.image.src = color;
        this.x = x;
        this.y = y;
        this.ctx = myGameArea.context;
        this.speedBoom = 5;
    }
    update() {
        console.log(myGamePiece.gravitySpeedX)
        if (this.LocationCheck) {
            let ctx = myGameArea.context;
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            // this.drowParticles()

        } else if (myGamePiece.gravitySpeedX > this.speedBoom || myGamePiece.gravitySpeedX < -this.speedBoom || myGamePiece.gravitySpeedY > this.speedBoom || myGamePiece.gravitySpeedY < -this.speedBoom) {
            initalParticles.arrParticles = [];
            initalParticles.Px = this.x;
            initalParticles.Py = this.y;
            initalParticles.intervalParticles();
            let index = initalParticles.arrPlayerBad.findIndex((val) => {
                return val.myGameGod.id == this.id
            })
            initalParticles.arrPlayerBad.splice(index, 1);
        } else {
            this.speedX = -this.speedX;
            this.speedY = -this.speedY;
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


const initalParticles = {
    widthPlayer: 40,
    idPlayer: 0,
    arrPlayerBad: [],
    arrParticles: [],
    Px: '',
    Py: '',
    counter: 180,
    update() {
        this.updateParticles();
        this.createNewBadPlayer();
    },
    createNewBadPlayer() {
        if (this.counter > 200) {
            let id = this.idPlayer;
            let x = Math.floor(Math.random() * myGameArea.canvas.height / 2);
            let y = Math.floor(Math.random() * myGameArea.canvas.width / 2);
            this.arrPlayerBad.push({
                myGameGod: new godPlayerGame(this.widthPlayer, this.widthPlayer, './img/black.png', x, y, id)
            })
            this.counter = 0;
            this.idPlayer++;
        }
        this.counter++
    },
    intervalParticles() {
        if (!this.arrParticles.length) {
            for (let x = 0; x < 20; x++) {
                this.arrParticles.push({
                    a: new drowParticles(this.Px, this.Py, this.widthPlayer)
                })
            }
        }
    },
    updateParticles() {
        for (let x in this.arrPlayerBad) {
            if (this.arrPlayerBad[x].myGameGod) {
                this.arrPlayerBad[x].myGameGod.newPos()
            }
        }
        for (let x in this.arrParticles) {
            if (this.arrParticles[x].a) {
                this.arrParticles[x].a.move()
            }
        }

    }

}

class drowParticles {
    constructor(x, y, sizePlayer) {
        this.ctx = myGameArea.context
        this.direction = Math.floor(Math.random() * 180) + 180;
        this.emoji = '▞';
        this.size = Math.random() * 10 + 10;
        this.direction = Math.floor(Math.random() * 180) + 180;
        this.angle = 0;
        this.x = x + sizePlayer / 2;
        this.y = y + sizePlayer / 2;
        this.spin = 0.2;
        this.life = 15;
    }
    move() {
        this.life -= 1;
        let speed = Math.floor(Math.random() * 8) + 8;
        // console.log(speed)
        var toRadians = this.direction / 180 * 3 * Math.PI;
        this.x += speed * Math.cos(toRadians)
        this.y += speed * Math.sin(toRadians)
        this.angle += this.spin
        if (this.life >= 0) {
            this.drawEmoji()
        }
    }
    drawEmoji() {
        this.ctx.font = this.size + "px Arial"
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.save(); /// To restore the state later on using ctx.restore();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle)
        this.ctx.fillText(this.emoji, 0, 0);
        this.ctx.restore();
        //restoring state  
    }

}
initalGame.startGame();