// Add your code here
const inputLink = document.getElementById('inputLink')
const myImg = document.getElementById('myImg')
const linkCopy = document.getElementById('linkCopy')

const convertLink = (el)=> {
       let link = el;
       let id = "";
       let splitUrl = link.split('=');
       id = splitUrl[1];
       if (splitUrl[1] === 'sharing' || splitUrl[1] === 'drivesdk') {
         splitUrl = link.split('/');
         id = splitUrl[5];
       }
       if (splitUrl[1] === 'view&id') {
         return link
       }
       return `https://drive.google.com/uc?export=view&id=${id}`
     }

inputLink.oninput = (e)=> {
 linkCopy.innerHTML = convertLink(e.target.value);
 myImg.src = convertLink(e.target.value);
}