const preloadImages = (arrSrc)=> {
  var images = [];
  for (let i in arrSrc) {
    images[i] = new Image();
    images[i].src = arrSrc[i];
  }
}


export default preloadImages