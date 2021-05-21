const timeBefore = (time, minutesEgo) => {
    let c = new Date();
    let b = new Date(time);
    let timeBetween = c.getTime() - b.getTime();
    let minute = 60000;
    if (timeBetween < minutesEgo * minute) {
        return false
    }
    return true
}


module.exports = timeBefore;