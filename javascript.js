const canvas = document.querySelector(".canvas");
const r = document.querySelector(":root");
let penColor = "black"; 
let penState = "pen";

let width = 700;
let height = 700;
let x=50;
let y=50;
let pixels = Array.from(Array(x), () => new Array(y));

let mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
}
document.body.onmouseup = function() {
  mouseDown = 0;
}

const penStateButtons = document.querySelectorAll(".penState");
console.log(penStateButtons);
penStateButtons.forEach(button => {
  button.addEventListener("click", (e) =>{
    penStateButtons.forEach(button =>{
      button.classList.remove("btn-selected");
    });

    button.classList.add("btn-selected");
    penState = button.getAttribute("data-penstate");
  });
}); 


r.style.setProperty("--pixelx", `${width/x}px`);
r.style.setProperty("--pixely", `${height/y}px`);
divy=width/y;
for(let i=0; i<x; i++){
    for(let j=0; j<y; j++){
        let newDiv = document.createElement("div");
        newDiv.classList.add("pixel");
        canvas.appendChild(newDiv);
        newDiv.draggable = false;
        newDiv.addEventListener("mouseenter", (e) => {
            if(mouseDown){
                draw(e.target);
            }
        });
        newDiv.addEventListener("mousedown", (e) => {
                draw(e.target);
        });
        pixels[i][j]=newDiv;
    }
}

function draw(elemnet){
  switch(penState){
    case "pen":
     // console.log(elemnet);
      elemnet.style["background-color"]= penColor;
      return;
    case "rainbow":
     // elemnet.style["background-color"]=`rgb(${rng255()},${rng255()},${rng255()})`;
      elemnet.style["background-color"]=rainbowCol();

      return;
    case "ereaser":
      elemnet.style["background-color"]= null;
  }

}


function rng255(){
  return Math.floor(Math.random() * 255);
}

let rainbowCounter = 0;
function rainbowCol(){
  rainbowCounter
  console.log(rainbowCounter);
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