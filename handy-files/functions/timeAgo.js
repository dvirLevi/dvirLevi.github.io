let timeAgo = (date) => {
  var d = new Date(date);
  var b = d.getTime();
  var n = Date.now() - b;
  return calculationTimeAgo(n);
}

let calculationTimeAgo = (ms) => {

  var ago = Math.floor(ms / 1000);
  var part = 0;
  if (ago < 2) {
    return "הרגע";
  }
  if (ago < 5) {
    return "לפני כמה רגעים";
  }
  if (ago < 60) {
    return  `לפני ${ago} שניות`;
  }

  if (ago < 120) {
    return "לפני דקה";
  }
  if (ago < 3600) {
    while (ago >= 60) {
      ago -= 60;
      part += 1;
    }
    return `לפני ${part} דקות`;
  }

  if (ago < 7200) {
    return "לפני שעה";
  }
  if (ago < 86400) {
    while (ago >= 3600) {
      ago -= 3600;
      part += 1;
    }
    return `לפני ${part} שעות`;
  }

  if (ago < 172800) {
    return "לפני יום";
  }
  if (ago < 604800) {
    while (ago >= 172800) {
      ago -= 172800;
      part += 1;
    }
    return  `לפני ${part + 1} ימים`;
  }

  if (ago < 1209600) {
    return "לפני שבוע";
  }
  if (ago < 2592000) {
    while (ago >= 604800) {
      ago -= 604800;
      part += 1;
    }
    return `לפני ${part} שבועות`;
  }

  if (ago < 5184000) {
    return "לפני חודש";
  }
  if (ago < 31536000) {
    while (ago >= 2592000) {
      ago -= 2592000;
      part += 1;
    }
    return `לפני ${part} חודשים`;
  }

  if (ago < 1419120000) { // 45 years, approximately the epoch
    return "לפני יותר משנה";
  }

  // TODO pass in Date.now() and ms to check for 0 as never
  return "never";
}


export default timeAgo