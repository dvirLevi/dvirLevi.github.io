const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');


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
    renderElements() {
        myPlants.innerHTML = "";
        for (let x = 0; x < arrPlants.length; x++) {
            box = new BoxPlant(arrPlants[x].img, arrPlants[x].id);
            box.createBox();
        }
    },
    aploadFile(e) {
        // var preview = document.querySelector('img');
        console.log(e.target.parentElement.id)
        let idForPushImg = e.target.parentElement.id;
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.addEventListener("load", function (e) {
            console.log(reader.result)
            for (let x in arrPlants) {
                if (arrPlants[x].id == idForPushImg) {
                    arrPlants[x].img = reader.result
                }
                createPlants.renderElements();
            }
        }, false);

        if (file) {
            reader.readAsDataURL(file);
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
        // label.textContent = "הוספת תמונה";
        label.innerHTML += '<p class="w-75 m-0">הוספת תמונה</p><i class="fas fa-cloud-upload-alt w-25"></i>'
        box.appendChild(label);

        let img = document.createElement('img');
        img.src = this.img;
        box.appendChild(img);

        myPlants.appendChild(box)
    }
}