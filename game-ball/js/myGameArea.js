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
        this.interval = setInterval(updateGameArea, 20);
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default myGameArea
