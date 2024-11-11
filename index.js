const backGroundColor = "black";
const cubeColor = "blue";
const rotationSpeed = 0.01; 
const point3D = function(x, y, z){ this.x = x; this.y = y; this.z = z};

let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");

let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

canvas.height = height;
canvas.width = width;   

ctx.fillStyle = backGroundColor;
ctx.strokeStyle = cubeColor;
ctx.lineWidth = width / 100;
ctx.lineCap = "round";

let cx = width / 2;
let cy = height / 2;
let cz = 0;
let size = height / 4;
let vertices = [
    new point3D(cx - size, cy - size, cz - size),
    new point3D(cx + size, cy - size, cz - size),
    new point3D(cx + size, cy + size, cz - size),
    new point3D(cx - size, cy + size, cz - size),
    new point3D(cx - size, cy - size, cz + size),
    new point3D(cx + size, cy - size, cz + size),
    new point3D(cx + size, cy + size, cz + size),
    new point3D(cx - size, cy + size, cz + size)
];

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
];

let rotateX = 0;
let rotateY = 0;
let rotateZ = 0;

function loop() {
    ctx.fillRect(0, 0, width, height);

   
    let angle = rotateZ * rotationSpeed * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dy = v.y - cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
    }

    angle = rotateX * rotationSpeed * Math.PI * 2;
    for (let v of vertices) {
        let dy = v.y - cy;
        let dz = v.z - cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + cy;
        v.z = z + cz;
    }

    
    angle = rotateY * rotationSpeed * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.x - cx;
        let dz = v.z - cz;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);
        v.x = x + cx;
        v.z = z + cz;
    }
    
    

    
    for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    requestAnimationFrame(loop);
}


document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "ArrowUp": rotateX = 1; break;    
        case "ArrowDown": rotateX = -1; break; 
        case "ArrowRight": rotateY = 1; break; 
        case "ArrowLeft": rotateY = -1; break; 
    }
});

document.addEventListener("keyup", (event) => {
    switch(event.key) {
        case "ArrowUp":
        case "ArrowDown": rotateX = 0; break;
        case "ArrowRight":
        case "ArrowLeft": rotateY = 0; break;
    }
});

loop();
