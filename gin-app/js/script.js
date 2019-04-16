const myPlants = document.getElementById('myPlants');
const buttAddPlant = document.getElementById('buttAddPlant');

let allId = 1;

let arrPlants = [];



const createPlants = {
    createBox() {
        for (let x = 0; x < arrPlants.length; x++) {
            let box = document.createElement('div');
            box.className = 'boxPlant';
            box.setAttribute('id', x);
            if (arrPlants[x].img == "") {
                let inp = document.createElement('input');
                inp.setAttribute('type', 'file');
                box.appendChild(inp);
            } else {
                let img = document.createElement('img');
                img.src = arrPlants[x].img;
                box.appendChild(img);
            }
            myPlants.appendChild(box)
        }
    },
    addPlant() {
        myPlants.innerHTML = "";
        arrPlants.push({
            img: "",
            id: allId
        });
        allId++;
        this.createBox();
    }
}
buttAddPlant.addEventListener('click', function () {
    createPlants.addPlant()
});