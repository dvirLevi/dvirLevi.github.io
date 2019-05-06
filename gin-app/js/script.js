const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');
const displayModal = document.getElementById('displayModal');
const modalBodyM = document.getElementById('modalBodyM');


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
                editPlant.openMenu(id);
                displayModal.style.display = 'block';
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
        modalBodyM.innerHTML = `<div class="d-flex align-items-center justify-content-center w-100">
                                    <div class="box-icon-select mt-5">
                                        <img src="img/bucket.png" alt="">
                                        <input placeholder="בחר תאריך" type="text" onfocus="(this.type='date')">
                                        <p>דישון</p>
                                    </div>
                                    <div class="box-icon-select mt-1">
                                        <img src="img/scissors.png" alt="">
                                        <input placeholder="בחר תאריך" type="text" onfocus="(this.type='date')">
                                        <p>גיזום</p>
                                    </div>
                                    <div class="box-icon-select mt-1">
                                        <img src="img/watering-can.png" alt="">
                                        <p>השקייה</p>
                                    </div>
                                    <div class="box-icon-select mt-5">
                                        <img src="img/sprout.png" alt="">
                                        <p>אחר</p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center justify-content-center w-100">
                                    <div class="boxPlant">
                                    <img src="${src}">
                                    </div>
                                </div>
                                <div id="buttSave">סיימתי</div>`;
        const buttSave = document.getElementById('buttSave');
        const wrapPboxM =document.getElementById('wrapPboxM');
        buttSave.addEventListener('click', function(){ 
            displayModal.style.display = 'none';
        })                        
    },

}