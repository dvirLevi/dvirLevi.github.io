const progressLife = {
    progressLife: document.getElementById('progressLife'),
    width: 0,
    innerWidth(size) {
        // alert()
        this.width = this.width + size
        this.progressLife.style.width = this.width + '%';
    }
}
export default progressLife
