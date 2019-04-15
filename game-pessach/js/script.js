const allBox = document.getElementById('allBox');
const titleBox = document.getElementById('titleBox');
const square = document.getElementsByClassName('square');
const squareA = document.getElementsByClassName('squareA');
const img2 = document.getElementsByClassName('img2');
const score = document.getElementById('score');
const myModal = document.getElementById('myModal');
const scoreModal = document.getElementById('scoreModal');
const buttSendScore = document.getElementById('buttSendScore');
const inpuName = document.getElementById('inpuName');
const table = document.getElementById('table');
const myModalScore = document.getElementById('myModalScore');
const buttTabl = document.getElementById('buttTabl');
const closeTable = document.getElementById('closeTable');
const buttStart = document.getElementById('buttStart');
const buttNoScore = document.getElementById('buttNoScore');

let testElementGame;
let testElementGame2;




const createBoxTitle = {
    arrBox: [{
            text: "נכון",
            src: "img/true.png",
            test: 1
        },
        {
            text: "לא נכון",
            src: "img/false.png",
            test: 0
        },
    ],
    create: function () {

        for (let x = 0; x < this.arrBox.length; x++) {
            let box = document.createElement('div');
            box.className = 'squareA';

            let img = document.createElement('img');
            img.setAttribute('src', this.arrBox[x].src);
            img.setAttribute('draggable', 'true');
            img.setAttribute('id', this.arrBox[x].test);
            img.addEventListener('dragstart', function (e) {
                testElementGame = e.target.id;
            })

            titleBox.appendChild(box);
            box.appendChild(img);
        }
    },
}
createBoxTitle.create();


let img
const createBox = {
    arrBox: [{
            src: "img/1.png",
            test: 1
        },
        {
            src: "img/1 (2).png",
            test: 1
        },
        {
            src: "img/1 (3).png",
            test: 1
        },
        {
            src: "img/1 (4).png",
            test: 1
        },
        {
            src: "img/1 (5).png",
            test: 1
        },
        {
            src: "img/1 (6).png",
            test: 1
        },
        {
            src: "img/1 (7).png",
            test: 1
        },
        {
            src: "img/1 (8).png",
            test: 1
        },
        {
            src: "img/0.png",
            test: 0
        },
        {
            src: "img/0 (2).png",
            test: 0
        },
        {
            src: "img/0 (3).png",
            test: 0
        },
        {
            src: "img/0 (4).png",
            test: 0
        },
        {
            src: "img/0 (5).png",
            test: 0
        },
        {
            src: "img/0 (6).png",
            test: 0
        },
        {
            src: "img/0 (7).png",
            test: 0
        },
        {
            src: "img/0 (8).png",
            test: 0
        }
    ],
    stopGame: 0,
    create: function () {
        for (let x = 0; x < 6; x++) {
            let box = document.createElement('div');
            box.className = 'square';
            img = document.createElement('img');
            img.setAttribute('src', '');
            img.className = 'img2';
            box.addEventListener('dragover', function (e) {
                e.preventDefault();
            })
            box.addEventListener('drop', function (e) {
                if (e.target.tagName == "IMG") {
                    if (testElementGame == testElementGame2) {
                        boxScore.countP()
                    } else {
                        boxScore.countM()
                    }
                } else {
                    boxScore.countM()
                }
            })
            allBox.appendChild(box);
            box.appendChild(img);
        }
        buttStart.addEventListener('click', function () {
            createBox.addText();
            buttStart.innerHTML = "התחלת!";
            createBox.stopGame = 0;
            boxScore.score = 0;
            score.innerHTML = boxScore.score
        })
    },
    time() {
        let setTime = Math.ceil(Math.random() * 2) + 1 + '000';
        console.log(setTime)
        const that = this;
        setTimeout(function () {
            that.addText()
        }, setTime);
    },
    addText() {
        for (let a = 0; a < square.length; a++) {
            img2[a].src = '';
        }
        let y = Math.floor(Math.random() * 6);
        let x = Math.floor(Math.random() * 16);

        img2[y].src = this.arrBox[x].src;
        testElementGame2 = this.arrBox[x].test;
        // console.log(x)
        this.stopGame++;
        
        if (this.stopGame < 25) {
            this.time()
        } else {

            img2[y].style.display = "none";
            this.stopGame = 0;
            myModal.style.display = "block";
            scoreModal.innerHTML = boxScore.score;
            buttStart.innerHTML = "שחק שוב!"
        }
    }
}
createBox.create()

const boxScore = {
    score: 0,
    countP() {
        this.score = this.score += 5;
        score.innerHTML = this.score
    },
    countM() {
        if (this.score > 0) {
            this.score = this.score -= 3;
            score.innerHTML = this.score
        }
    },
}

const sendScore = {
    score: {
        name: "",
        score: ""
    },
    createEvent() {
        buttSendScore.addEventListener('click', this.sendServer.bind(this))
        buttNoScore.addEventListener('click', function () {
            myModal.style.display = "none";
            boxScore.score = 0;
            score.innerHTML = boxScore.score
        })
    },
    sendServer() {
        if (inpuName.value != "") {

            this.score.name = inpuName.value;
            this.score.score = boxScore.score;

            myModal.style.display = "none";
            inpuName.value = "";

            const objtojson = JSON.stringify(sendScore.score);

            const request = async function () {
                const response = await fetch('https://gamepessach.herokuapp.com/game', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: objtojson
                });
                const json = await response.json();
            }

            request();
        } else {
            Swal.fire({
                type: 'error',
                title: 'אופס...',
                text: 'יש להכניס שם שחקן',
            })
        }
        boxScore.score = 0;
        score.innerHTML = boxScore.score
    }
}
sendScore.createEvent()

getScore = {
    arrScore: "",
    getServer() {
        const request = async function () {
            const response = await fetch('https://gamepessach.herokuapp.com/game');
            const json = await response.json();
            getScore.arrScore = json;
            getScore.toDom()
        }
        request();
    },
    toDom() {
        for (let x = 0; x < this.arrScore.length; x++) {
            table.innerHTML += `<div class="row-table">
                                   <div class="col-table">
                                   ` + this.arrScore[x].name + `
                                   </div>
                                   <div class="col-table">
                                  ${this.arrScore[x].score}
                                   </div>
                               </div>`
        };
    },
    addEvents(){
        buttTabl.addEventListener('click', function () {
            myModalScore.style.display = 'block';
            getScore.getServer();
        })
        closeTable.addEventListener('click', function () {
            myModalScore.style.display = 'none';
            table.innerHTML = ""
        })
    }
    // showTableScore() {
    //     alert("zxc")
    //     myModalScore.style.display = "block"
    // }
}
getScore.addEvents()