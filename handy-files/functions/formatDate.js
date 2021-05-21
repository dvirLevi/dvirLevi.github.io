const formatDate = {
  dateV(date) {
    let month = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי",
      "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];
    let d = new Date(date);
    return d.getDate() + " " + "ב" + month[d.getMonth()] + " " + d.getFullYear()
  },
  date(date) {
    let d = new Date(date);
    return this.addZero(d.getDate()) + '/' + this.addZero((1 + d.getMonth())) + '/' + d.getFullYear();
  },
  time(date) {
    let d = new Date(date);
    return this.addZero(d.getHours()) + ":" + this.addZero(d.getMinutes())
  },
  addZero(n) {
    return (n.toString().length <= 1) ? "0" + n : n;
  }
}


export default formatDate