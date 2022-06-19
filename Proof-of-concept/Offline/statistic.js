const numb = document.querySelector(".number");
let counter = 0;
setInterval(() => {
  if(counter == 75 ){
    clearInterval();
  }else{
    counter+=1;
    numb.textContent = counter + "%";
  }
}, 80);