const canvas = document.querySelector(".canvas");
const r = document.querySelector(":root");
console.log(canvas);

let pixels = {};
let width = 700;
let height = 700;
let x=10;
let y=10;


r.style.setProperty("--pixelx", `${width/x}px`);
r.style.setProperty("--pixely", `${height/y}px`);
divy=width/y;
for(let i=0; i<x; i++){
    for(let j=0; j<y; j++){
        let newDiv = document.createElement("div");
        newDiv.classList.add(".pixel");
        canvas.appendChild(newDiv);
    }
}