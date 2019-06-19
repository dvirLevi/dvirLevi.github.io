const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');
const displayModal = document.getElementById('displayModal');
const modalBodyM = document.getElementById('modalBodyM');
const boxPlant = document.getElementById('boxPlant');
const days = document.getElementById('days');
const selectDay = document.getElementById('selectDay');
const deySelect = document.getElementById('deySelect');
const inputPruning = document.getElementById('inputPruning');
const inputElk = document.getElementById('inputElk');
const editPlants = document.getElementById('editPlants');
const inputReminder = document.getElementById('inputReminder');
const buttSave = document.getElementById('buttSave');
const buttDelete = document.getElementById('buttDelete');
const userNameRgistar = document.getElementById('userNameRgistar');
const passwordAgainRgistar = document.getElementById('passwordAgainRgistar');
const passwordRgistar = document.getElementById('passwordRgistar');
const sentRegistar = document.getElementById('sentRegistar');
const sentConnect = document.getElementById('sentConnect');
const displayModalRgistar = document.getElementById('displayModalRgistar');
const ifRegistar = document.getElementById('ifRegistar');
const displayRegistar = document.getElementById('displayRegistar');
const displayConnect = document.getElementById('displayConnect');
const userNameConnect = document.getElementById('userNameConnect');
const passwordConnect = document.getElementById('passwordConnect');
const tasksPruning = document.getElementById('tasksPruning');
const tasksElk = document.getElementById('tasksElk');
const tasksWatering = document.getElementById('tasksWatering');
const tasksTask = document.getElementById('tasksTask');
const menuOpen = document.getElementById('menuOpen');
const hamburger = document.getElementById('hamburger');
const signout = document.getElementById('signout');




const openAndCloseMenu = (element) => {
    if (element.style.display == 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
const findHigeNamber = (arr) => {
    let HigeNamber = 0;
    for (let x in arr) {
        if (arr[x].id > HigeNamber) {
            HigeNamber = arr[x].id;
        }
    }
    return HigeNamber + 1;
}

// let arrPlants = [];

let arrPlants;
let allId;

const menu = {
    initalMenu() {
        menuOpen.style.display = 'none';
        hamburger.onclick = () => {
            openAndCloseMenu(menuOpen)
        }
        signout.onclick = () => {
            localStorage.removeItem("userNameGinApp");
            location.reload();
        }
    }
}
menu.initalMenu()

const createPlants = {
    addPlant() {
        arrPlants.push({
            img: "",
            id: allId,
            days: [],
            name: "",
            elk: "",
            pruning: "",
            reminder: "",
        });
        allId++;
        this.renderElements();
    },
    aploadFile(e) {
        let idForPushImg = e.target.parentElement.id;
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", (e) => {
            for (let x in arrPlants) {
                if (arrPlants[x].id == idForPushImg) {
                    arrPlants[x].img = reader.result
                }
            }
            this.renderElements();
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    },
    renderElements() {
        myPlants.innerHTML = "";
        editPlants.innerHTML = "";
        server.update(arrPlants);

        for (let x = 0; x < arrPlants.length; x++) {
            let box = new BoxPlant(arrPlants[x].img, arrPlants[x].id);
            box.createBox();
        }
    }
}
buttAddPlant.addEventListener('click', function () {
    let testIfUndefined = arrPlants.find((el) => {
        return el.img == ""
    });
    if (testIfUndefined == undefined) {
        createPlants.addPlant()
    } else {
        Swal.fire({
            type: 'error',
            title: 'כבר הוספת צמח!',
            text: 'כעת הוסף תמונה של הצמח..',
            timer: 1500
        })
    }
});
class BoxPlant {
    constructor(img, id) {
        this.img = img;
        this.id = id;
    }
    createBox() {
        let box = document.createElement('div');
        box.className = 'boxPlant';
        box.setAttribute('id', this.id);

        if (this.img == "") {
            let buttAddImg = document.createElement('input');
            buttAddImg.className = 'butt-add-img';
            buttAddImg.setAttribute('type', 'file');
            buttAddImg.setAttribute('id', 'buttAddImg' + this.id);
            buttAddImg.addEventListener("change", function (e) {
                createPlants.aploadFile(e)
            });
            box.appendChild(buttAddImg);

            let label = document.createElement('label');
            label.className = 'custom-file-upload';
            label.setAttribute('for', 'buttAddImg' + this.id);
            label.innerHTML += '<p class="w-75 m-0">הוספת תמונה</p><i class="fas fa-cloud-upload-alt w-25"></i>'
            box.appendChild(label);
            editPlants.appendChild(box)
        } else {
            let img = document.createElement('img');
            img.src = this.img;
            box.appendChild(img);
            let hamburgerPlant = document.createElement('div');
            hamburgerPlant.className = "hamburger-plant";
            hamburgerPlant.innerHTML = `<div></div>
                                        <div></div>
                                        <div></div>`;
            hamburgerPlant.onclick = (e) => {
                let id = e.target.parentElement.id;
                editPlant.openMenu(id);
            };
            box.setAttribute("draggable", "true");
            box.style.backgroundImage = 'none';
            box.style.opacity = 1;
            box.appendChild(hamburgerPlant);
            myPlants.appendChild(box);
        }
    }
}

const editPlant = {
    idOfPlantEdit: "",
    pointerEditPlant: "",
    openMenu(id) {
        this.idOfPlantEdit = id;
        this.pointerEditPlant = arrPlants.filter((el) => {
            return el.id == this.idOfPlantEdit
        });
        let src = this.pointerEditPlant[0].img;
        boxPlant.innerHTML = `<img src="${src}">
                              <input id="namePlant" placeholder="שם צמח" >`;
        boxPlant.style.backgroundImage = 'none';
        this.insertIfHaveData();
        displayModal.style.display = 'block';
        selectDay.style.display = 'none';
        days.onclick = () => {
            openAndCloseMenu(selectDay);
            if (selectDay.style.display == 'block') {
                this.renderDaysInMenu()
            }
        };
        buttSave.onclick = () => {
            this.saveEndClose(id)
        };
        buttDelete.onclick = () => {
            this.deletePlant(id)
        };

    },
    insertIfHaveData() {
        if (this.pointerEditPlant[0].days.length) {
            this.pushDay();
        }
        if (this.pointerEditPlant[0].name != "") {
            namePlant.value = this.pointerEditPlant[0].name;
        };
        if (this.pointerEditPlant[0].elk != "") {
            inputElk.value = this.pointerEditPlant[0].elk;
        };
        if (this.pointerEditPlant[0].pruning != "") {
            inputPruning.value = this.pointerEditPlant[0].pruning;
        };
        if (this.pointerEditPlant[0].reminder != "") {
            inputReminder.value = this.pointerEditPlant[0].reminder;
        };
    },
    arrMenu: [{
            text: "ראשון",
            number: 0
        },
        {
            text: "שני",
            number: 1
        },
        {
            text: "שלישי",
            number: 2
        },
        {
            text: "רביעי",
            number: 3
        },
        {
            text: "חמישי",
            number: 4
        },
        {
            text: "שישי",
            number: 5
        },
        {
            text: "שבת",
            number: 6
        },
        {
            text: "נקה ימים",
            number: ""
        },
    ],
    renderDaysInMenu() {
        selectDay.innerHTML = "";
        for (let x in this.arrMenu) {
            const p = document.createElement('p');
            p.innerHTML = this.arrMenu[x].text;
            p.id = this.arrMenu[x].number;
            for (let y in this.pointerEditPlant[0].days) {
                if (this.pointerEditPlant[0].days[y] == x) {
                    p.className = "one-day-select";
                }
            }
            p.onclick = (e) => {
                this.addDay(e)
            };
            selectDay.appendChild(p)
        }
    },
    addDay(e) {
        if (e.target.textContent == "נקה ימים") {
            deySelect.innerHTML = "בחר יום";
            this.pointerEditPlant[0].days = [];
            this.renderDaysInMenu();
        } else {
            let testIsAlredy = this.pointerEditPlant[0].days.some((val) => {
                return val == e.target.id
            })
            if (!testIsAlredy) {
                this.pointerEditPlant[0].days.push(e.target.id);
                this.renderDaysInMenu();
                this.pushDay();
            } else {
                // כאן אפשר למחוק יום
            }
        }
    },
    pushDay() {
        deySelect.innerHTML = ""
        for (let x in this.pointerEditPlant[0].days) {
            let day = document.createElement('div');
            day.innerHTML = this.arrMenu[this.pointerEditPlant[0].days[x]].text;
            deySelect.insertBefore(day, deySelect.childNodes[0]);
        }
    },
    saveEndClose() {
        const namePlant = document.getElementById('namePlant');
        this.pointerEditPlant[0].name = namePlant.value;
        this.pointerEditPlant[0].elk = inputElk.value;
        this.pointerEditPlant[0].pruning = inputPruning.value;
        this.pointerEditPlant[0].reminder = inputReminder.value;
        if (this.pointerEditPlant[0].name != "") {
            openAndCloseMenu(displayModal);
            this.cleatInputs();
            server.update(arrPlants);
            tasks.renderTasksToTable();
        } else {
            Swal.fire({
                type: 'error',
                title: 'אופס...',
                text: 'יש להכניס שם צמח!',
                timer: 1500
            })
        }
    },
    cleatInputs() {
        namePlant.value = "";
        inputElk.value = "";
        inputPruning.value = "";
        inputReminder.value = "";
        deySelect.innerHTML = "בחר יום";
    },
    deletePlant() {
        let index = arrPlants.findIndex((value) => {
            return value.id == this.idOfPlantEdit
        });
        arrPlants.splice(index, 1);
        openAndCloseMenu(displayModal);
        createPlants.renderElements();
        tasks.renderTasksToTable();
        this.cleatInputs();
    }

}

const tasks = {
    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },
    day() {
        return new Date().getDay() + 1;
    },
    renderTasksToTable() {
        tasksElk.innerHTML = "";
        tasksPruning.innerHTML = "";
        tasksWatering.innerHTML = "";
        tasksTask.innerHTML = "";
        for (let x in arrPlants) {
            if (arrPlants[x].elk == this.formatDate()) {
                tasksElk.innerHTML += `<div class="w-100">${arrPlants[x].name}</div>`
            }
            if (arrPlants[x].pruning == this.formatDate()) {
                tasksPruning.innerHTML += `<div class="w-100">${arrPlants[x].name}</div>`
            }
            if (arrPlants[x].reminder != "") {
                tasksTask.innerHTML += `<div class="w-100">${arrPlants[x].reminder}</div>`
            }
            for (let y in arrPlants[x].days) {
                console.log(this.day())
                console.log(arrPlants[x].days[y])
                if (+arrPlants[x].days[y] + 1 == this.day()) {
                    tasksWatering.innerHTML += `<div class="w-100">${arrPlants[x].name}</div>`
                }
            }
        }
    },
}


const registar = {
    user: {
        userName: null,
        password: null
    },
    addEvent() {
        if (localStorage.getItem("userNameGinApp")) {
            openAndCloseMenu(displayModalRgistar);
        } else {
            sentRegistar.onsubmit = () => {
                this.sendData();
                return false;
            };
            sentConnect.onsubmit = () => {
                this.sendDataConnect();
                return false;
            };
            displayRegistar.style.display = 'block';
            displayConnect.style.display = 'none';
            ifRegistar.onclick = () => {
                this.ifRegistarOrConnect()
            }
        }
    },
    ifRegistarOrConnect() {
        openAndCloseMenu(displayRegistar);
        openAndCloseMenu(displayConnect);
        if (displayRegistar.style.display == "block") {
            ifRegistar.innerHTML = "כבר רשום? לחץ כאן!";
        } else {
            ifRegistar.innerHTML = "להרשמה";
        }
    },
    sendData() {
        if (passwordAgainRgistar.value == passwordRgistar.value) {
            this.user.userName = userNameRgistar.value;
            this.user.password = passwordRgistar.value;
            server.insert(this.user);
        } else {
            Swal.fire({
                type: 'error',
                title: 'אופס...',
                text: 'הססמאות אינן תואמות',
                timer: 1500
            })
        }
    },
    sendDataConnect() {
        this.user.userName = userNameConnect.value;
        this.user.password = passwordConnect.value;
        server.conect(this.user);
    },
    saveDataInStoreg(data, registerOrConect) {
        console.log(registerOrConect)
        if (data == 400) {
            if (registerOrConect === "registar") {
                Swal.fire({
                    type: 'error',
                    title: '',
                    text: 'שם משתמש תפוס, בחר שם אחר.',
                    timer: 1500
                })
            } else {
                Swal.fire({
                    type: 'error',
                    title: '',
                    text: 'שם משתמש או ססמה שגויים..',
                    timer: 1500
                })
            }

        } else {
            localStorage.setItem("userNameGinApp", JSON.stringify(data));
            this.addEvent();
            mainData.inital();
            if (registerOrConect === "registar") {
                Swal.fire({
                    type: 'success',
                    title: '',
                    text: data.userName + ' נרשמת בהצלחה!',
                    timer: 1500
                })
            } else {
                Swal.fire({
                    type: 'success',
                    title: '',
                    text: data.userName + " ברוכים השבים!",
                    timer: 1500
                })
            }
        }
    }
}
registar.addEvent();

const server = {
    userId() {
        if (localStorage.getItem("userNameGinApp")) {
            return JSON.parse(localStorage.getItem("userNameGinApp")).userId;
        }
    },
    async insert(obj) {
        const objtojson = JSON.stringify(obj);
        const response = await fetch('http://localhost:8000/', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: objtojson
        });
        const json = await response.json();
        console.log(json)
        registar.saveDataInStoreg(json, "registar");
    },
    async update(arr) {
        const id = this.userId();
        const objtojson = JSON.stringify(arr);
        const response = await fetch(`http://localhost:8000/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
            },
            body: objtojson,
        });
        const json = await response.json();
    },
    async get() {
        const id = this.userId();
        // const objtojson = JSON.stringify(arr);
        const response = await fetch(`http://localhost:8000/${id}`);
        const json = await response.json();
        return json.arrPlant;
    },
    async conect(obj) {
        const objtojson = JSON.stringify(obj);
        const response = await fetch(`http://localhost:8000/conect`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: objtojson,
        });
        const json = await response.json();
        registar.saveDataInStoreg(json, "conect");
    }
}

const mainData = {
    async inital() {
        if (localStorage.getItem("userNameGinApp")) {
            arrPlants = await server.get();
            tasks.renderTasksToTable();
            if (await arrPlants.length) {
                allId = findHigeNamber(arrPlants);
                createPlants.renderElements();
            } else {
                allId = 1;
            }
        } else {
            // לבדוק אם מיותר
            arrPlants = [];
            allId = 1;
        }
    }
}
mainData.inital();