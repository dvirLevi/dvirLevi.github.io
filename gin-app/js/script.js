const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');

let allId = 1;

let arrPlants = [];



const createPlants = {
    // createBox() {
    //     for (let x = 0; x < arrPlants.length; x++) {
    //         let box = document.createElement('div');
    //         box.className = 'boxPlant';
    //         box.setAttribute('id', x);
    //         if (arrPlants[x].img == "") {
    //             let inp = document.createElement('input');
    //             inp.setAttribute('type', 'file');
    //             box.appendChild(inp);
    //         } else {
    //             let img = document.createElement('img');
    //             img.src = arrPlants[x].img;
    //             box.appendChild(img);
    //         }
    //         myPlants.appendChild(box)
    //     }
    // },
    addPlant() {
        myPlants.innerHTML = "";
        arrPlants.push({
            img: "",
            id: allId
        });
        allId++;
        // this.createBox();
        for (let x = 0; x < arrPlants.length; x++) {
            box = new BoxPlant(arrPlants[x].img, arrPlants[x].id);
            box.createBox();
        }
    }
}
buttAddPlant.addEventListener('click', function () {
    createPlants.addPlant()
});

class BoxPlant {
    constructor (img , id) {
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
        buttAddImg.setAttribute('id', 'buttAddImg');
        box.appendChild(buttAddImg);

        let label = document.createElement('label');
        label.className = 'custom-file-upload';
        label.setAttribute('for', 'buttAddImg');
        // label.textContent = "הוספת תמונה";
        label.innerHTML += '<p class="w-75 m-0">הוספת תמונה</p><i class="fas fa-cloud-upload-alt w-25"></i>'
        box.appendChild(label);

        // let img = document.createElement('img');
        // img.src = this.img;
        // box.appendChild(img);

        myPlants.appendChild(box)
    }
}