const canvas = document.querySelector(".canvas");
const r = document.querySelector(":root");
let penColor = "black"; 

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
                e.target.style["background-color"]=penColor;
            }
        });
        newDiv.addEventListener("mousedown", (e) => {
                e.target.style["background-color"]=penColor;
        });
        pixels[i][j]=newDiv;
    }
}