
//initial data
let tools = document.querySelectorAll('.tools .tool');
let colors = document.querySelectorAll('.colors .color');
let canvas = document.querySelector('#board');
let context = canvas.getContext('2d');

// define de Canvas size = the canvas-area
let painting = document.getElementById('canvas-area');
let paintStyle = getComputedStyle(painting);
canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));
context.fillStyle = 'white';

let currentTool = 'pencil';
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

changeCursor();

//Events
tools.forEach((tool) => {
    tool.addEventListener('click', () => {
        let classes = tool.classList;
        if (classes.contains('selected')) {
            canvas.style.cursor = 'auto';
            tool.classList.remove('selected');
        } else {
            currentTool = tool.getAttribute('data-tool');
            console.log(currentTool);

            if (currentTool !== 'clean') {
                removeToolSelectedClass();
                tool.classList.add('selected');
            }

            changeCursor();
        }
    });
});

colors.forEach((color) => {
    color.addEventListener('click', colorClickEvent);
});

canvas.addEventListener('mousedown', mouseDownEvent);
canvas.addEventListener('mousemove', mouseMoveEvent);
canvas.addEventListener('mouseup', mouseUPEvent);
canvas.addEventListener('click', changeBackgroungColor);

document.querySelector('.tool.clean').addEventListener('click', clearBoard);

document.querySelector('#download').addEventListener('click', downloadCanvas);

//Functions
function colorClickEvent(event) {
    let color = event.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    event.target.classList.add('active');
}

function changeCursor() {
    switch (currentTool) {
        case 'pencil':
            canvas.style.cursor = 'url("assets/images/pencil-solid.svg"), auto';
            break;
        case 'bucket':
            canvas.style.cursor = 'url("assets/images/fill-drip-solid.svg"), auto';
            break;
        case 'eraser':
            canvas.style.cursor = 'url("assets/images/eraser-solid.svg"), auto';
            break;
        default:
            canvas.style.cursor = 'auto';
            break;
    }
}

function removeToolSelectedClass() {
    tools.forEach((tool) => {
        if (tool.classList.contains('selected')) {
            tool.classList.remove('selected');
        }
    });
}

function mouseDownEvent(event) {
    if (currentTool === 'pencil' || currentTool === 'eraser') {
        canDraw = true;
        mouseX = event.pageX - canvas.offsetLeft;
        mouseY = event.pageY - canvas.offsetTop;
    }
}

function mouseMoveEvent(event) {
    if (canDraw) {
        draw(event.pageX, event.pageY);
    }
}

function mouseUPEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - canvas.offsetLeft;
    let pointY = y - canvas.offsetTop + 16; //16 para que a linha começe na ponta do icone

    context.beginPath();
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    if (currentTool === 'pencil') {
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 5;
        context.strokeStyle = currentColor;
    } else if (currentTool === 'eraser') {
        context.globalCompositeOperation = "destination-out"; //apaga o que foi desenhado
        context.lineWidth = 10;
    }
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearBoard() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    canvas.style.backgroundColor = 'white';
    removeToolSelectedClass();
}

function changeBackgroungColor() {
    if (currentTool === 'bucket') {
        canvas.style.backgroundColor = currentColor;
        /*context.fillStyle = currentColor;
        context.fillRect(0, 0, canvas.width, canvas.height);*/
    }

}

function downloadCanvas() {
    let capture = document.querySelector('#board');
    html2canvas(capture).then(function (aux) {
        let anchor = document.createElement('a');
        anchor.href = aux.toDataURL('image/png');
        anchor.download = 'image.png';
        anchor.click();
    });
}