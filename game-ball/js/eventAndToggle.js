const eventAndToggle = {
    addEvent(Toggle, el, firstInital) {
        if(firstInital === 'block'){
        el.style.display = 'block'

        }else{
            el.style.display = 'none'
        }
        Toggle.onclick = () => {
            this.addToggle(el)
        }
    },
    addToggle(el) {
        if(el.style.display === 'none'){
            el.style.display = 'block'
        }else{
            el.style.display = 'none'
        }
    }
}
export default eventAndToggle