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

let allId = 1;

let arrPlants = [];



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
                this.renderElements();
            }
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    },
    renderElements() {
        myPlants.innerHTML = "";
        editPlants.innerHTML = "";
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
        this.insertIfHaveData();
        displayModal.style.display = 'block';
        const buttSave = document.getElementById('buttSave');
        selectDay.style.display = 'none';
        days.onclick = () => {
            this.selectDay()
        };
        buttSave.onclick = () => {
            this.saveEndClose(id)
        };

    },
    insertIfHaveData(){
        if (this.pointerEditPlant[0].days.length) {
            this.pushDay();
        }
        if(this.pointerEditPlant[0].name != ""){
            namePlant.value = this.pointerEditPlant[0].name;
        };
        if(this.pointerEditPlant[0].elk != ""){
            inputElk.value = this.pointerEditPlant[0].elk;
        };
        if(this.pointerEditPlant[0].pruning != ""){
            inputPruning.value = this.pointerEditPlant[0].pruning;
        };
        if(this.pointerEditPlant[0].reminder != ""){
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
    selectDay() {

        if (selectDay.style.display == 'none') {
            selectDay.style.display = 'block';
            this.renderDaysInMenu()
        } else {
            selectDay.style.display = 'none';
        }
    },
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
        displayModal.style.display = 'none';
        console.log(arrPlants);
        namePlant.value = "";
        inputElk.value = "";
        inputPruning.value = "";
        inputReminder.value = "";
        deySelect.innerHTML = "בחר יום";
    }

}