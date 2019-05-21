const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');
const displayModal = document.getElementById('displayModal');
const modalBodyM = document.getElementById('modalBodyM');
const boxPlant = document.getElementById('boxPlant');
const days = document.getElementById('days');
const selectDay = document.getElementById('selectDay');
const deySelect = document.getElementById('deySelect');

let allId = 1;

let arrPlants = [];



const createPlants = {
    addPlant() {
        arrPlants.push({
            img: "",
            id: allId,
            days:[]
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
                let id = e.target.parentElement.parentElement.id;
                editPlant.openMenu(id);
            };
            box.style.backgroundImage = 'none';
            box.style.opacity = 1;
            box.appendChild(hamburgerPlant);
            
        }

        myPlants.appendChild(box)
    }
}

const editPlant = {
    idOfPlantEdit: "",
    openMenu(id) {
        this.idOfPlantEdit = id;
        let objPlant = arrPlants.filter((el) => {
            return el.id == this.idOfPlantEdit
        });
        let src = objPlant[0].img;
        boxPlant.innerHTML = `<img src="${src}">
                              <input placeholder="שם צמח" >`;
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
        } else {
            selectDay.style.display = 'none';
        }
        selectDay.innerHTML = "";
        for (let x in this.arrMenu) {
            const p = document.createElement('p');
            p.innerHTML = this.arrMenu[x].text;
            p.id = this.arrMenu[x].number;
            p.onclick = (e) => {
                this.addDay(e)
            };
            selectDay.appendChild(p)
        }
    },
    addDay(e) {
        if (deySelect.innerHTML == "בחר") {
            deySelect.innerHTML = ""
        }
        let day = document.createElement('div');
        day.innerHTML = e.target.textContent;
        deySelect.insertBefore(day, deySelect.childNodes[0]);
        let partOfArrPlants = arrPlants.filter((e)=>{
                return e.id == this.idOfPlantEdit
        })
        partOfArrPlants[0].days.push(e.target.id);
        if (e.target.textContent == "נקה ימים") {
            deySelect.innerHTML = "בחר";
            partOfArrPlants[0].days = []
        }
    },
    saveEndClose(id) {
        for (let x in arrPlants) {
            if (arrPlants[x].id == id) {
                console.log(arrPlants[x].id)
            }
        }
        displayModal.style.display = 'none';
    }

}