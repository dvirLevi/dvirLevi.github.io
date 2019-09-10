const score = {
    elementScore: document.getElementById('score'),
    numScore: 0,
    innerScore(score) {
        this.numScore = this.numScore + score
        this.elementScore.innerHTML = this.numScore;
    }
}
export default score
