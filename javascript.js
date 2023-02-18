const canvas = document.querySelector(".canvas");
const r = document.querySelector(":root");
let penColor = "black"; 
let penState = "pen";
let pensize = 1;

let width = 700;
let height = 700;
let x=50;
let y=50;
let pixels;

createPixels(width,height,x,y);
create2Darr(10);

let mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
}
document.body.onmouseup = function() {
  mouseDown = 0;
}

const penStateButtons = document.querySelectorAll(".penState");
penStateButtons.forEach(button => {
  button.addEventListener("click", (e) =>{
    penStateButtons.forEach(button =>{
      button.classList.remove("btn-selected");
    });

    button.classList.add("btn-selected");
    penState = button.getAttribute("data-penstate");
  });
}); 

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", (e) =>{
  clearPixels(width,height,x,y);
});


const xySlider = document.querySelector(".xy");
const xyText = document.querySelector(".xyText");
xySlider.addEventListener("mouseup", (e) =>{
  val = xySlider.value;
  clearPixels(width , height, val, val);
});
xySlider.addEventListener("input", (e) =>{
  val = xySlider.value;
  xyText.innerText = `${val}x${val}`;
});


const penSlider = document.querySelector(".penSize");
const penSizeText = document.querySelector(".penSizeText");
penSlider.addEventListener("input", (e) =>{
  val = penSlider.value;
  penSizeText.innerText = `${val}px`;
  pensize=val;
});



const colorInput = document.querySelector(".colorInput");
const colorLabel = document.querySelector(".colorLabel");
colorInput.addEventListener("input", (e) => {
  let col = e.target.value;
  penColor = col;
  r.style.setProperty("--penCol", col);
});


const bgInput = document.querySelector(".bgInput");
const bgLabel = document.querySelector(".bgLabel");
bgInput.addEventListener("input", (e) => {
  let col = e.target.value;
  penColor = col;
  r.style.setProperty("--canvasbg", col);
});



function createPixels(width,height, x,y){
  let k = 0;
  pixels = create2Darr(x,y);
  r.style.setProperty("--pixelx", `${width/x}px`);
  r.style.setProperty("--pixely", `${height/y}px`);
  for(let i=0; i<x; i++){
      for(let j=0; j<y; j++){
          let newDiv = document.createElement("div");
          newDiv.classList.add("pixel");
          canvas.appendChild(newDiv);
          newDiv.draggable = false;
          newDiv.setAttribute("data-x", i);
          newDiv.setAttribute("data-y", j);
          newDiv.addEventListener("mouseenter", (e) => {
              if(mouseDown){
                  draw(e.target);
              }
          });
          newDiv.addEventListener("mousedown", (e) => {
                  draw(e.target);
          });
          k++;
          pixels[i][j]=newDiv;
      }
  }
}


function clearPixels(widt,height, x, y){
  pixels.forEach(pxs => {
    pxs.forEach(px => {
      px.remove();
    });
  });
  createPixels(widt,height,x,y);
}


function draw(element){
  surroundingPixels = getSurroundingPixels(element);
  let col = rainbowCol();
  switch(penState){
    case "pen":
      surroundingPixels.forEach(element => {
        element.style["background-color"]= penColor;
      });
      return;
    case "rainbow1":
     surroundingPixels.forEach(element => {
       element.style["background-color"]=col;
    });

      return;
    case "rainbow2":
        surroundingPixels.forEach(element => {
          element.style["background-color"]=rainbowCol();
       });
   
      return;
    case "ereaser":
      surroundingPixels.forEach(element => {
        element.style["background-color"]= null;
     });
      return;
  }

}


function getSurroundingPixels(element){
let x = +element.getAttribute("data-x");
let y = +element.getAttribute("data-y");
let elements = [];
let a = 0;

// makes it work for even and odd sizes
if(isEven(pensize)) a = 1;
let offset = Math.floor(pensize/2);

for(let i=-offset; i<=offset - a; i++){
  for(let j=-offset; j<=offset - a; j++){
  if(pixels[x+i] === undefined) continue;
  let pixel = pixels[x+i][y+j];
  if(pixel === null || pixel === undefined) continue;
  elements.push(pixel);
  }
}
return elements;
}

function rng255(){
  return Math.floor(Math.random() * 255);
}

let rainbowCounter = 0;
function rainbowCol(){
  rainbowCounter
  let col;
  rainbowCounter++;
  if(rainbowCounter>6) rainbowCounter = 0;
  switch (rainbowCounter){
    case 0:
      col = "#FF0000";
      return col;
    case 1:
        col = "#FF7F00";
      return col;
    case 2:
        col = "#FFFF00";
      return col;
    case 3:
        col = "#00FF00";
      return col;
    case 4:
        col = "#0000FF";
      return col;
    case 5:
        col = "#9400D3";
      return col;
    case 6:
        col = "#4B0082";
      return col;
  }
}

function isEven(num){
  return (num%2 === 0);
}

function create2Darr(rows, cols){
  let arr = []

  for(let i = 0; i < rows; i++){
    arr[i]= [];
  }

  return arr;
} 