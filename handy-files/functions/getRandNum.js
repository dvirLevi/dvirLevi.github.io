const getRandNum = (max, min) => {
  return Math.random() * (max - min) + min;
}

export default getRandNum