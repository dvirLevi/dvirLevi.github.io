const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');
const displayModal = document.getElementById('displayModal');
const modalBodyM = document.getElementById('modalBodyM');
const boxPlant = document.getElementById('boxPlant');
const days = document.getElementById('days');
const selectDay = document.getElementById('selectDay');

let allId = 1;

let arrPlants = [];



const createPlants = {
    addPlant() {
        arrPlants.push({
            img: "",
            id: allId
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
    createPlants.addPlant()
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
            hamburgerPlant.addEventListener("click", function (e) {
                let id = e.target.parentElement.parentElement.id;
                displayModal.style.display = 'block';
                editPlant.openMenu(id);
            });
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
        boxPlant.innerHTML = `<img src="${src}">`;
        const buttSave = document.getElementById('buttSave');
        selectDay.style.display = 'none';
        days.onclick = ()=>{this.selectDay()};
        buttSave.onclick = ()=>{ this.saveEndClose()};

    },
    arrMenu:[
        {
            text:"1",
        },
        {
            text:"1",
        },
        {
            text:"1",
        },
        {
            text:"1",
        },
        {
            text:"1",
        },
        {
            text:"1",
        },
        {
            text:"1",
        },
        {
            text:"נקה ימים",
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
            p.onclick ="";
            selectDay.appendChild(p)
        }
    },
    addDay(){

    },
    saveEndClose() {
        displayModal.style.display = 'none';
    }

}