

// draw "blank" (or white) canvas
const blankCanvas = document.getElementById("blankCanvas");
const ctxBg = blankCanvas.getContext("2d");
const drawCanvas = document.getElementById('drawCanvas');
const ctx = drawCanvas.getContext("2d");
let canvasColor = '#ffffff'
const drawBlank = () => {
    ctxBg.fillStyle = canvasColor;
    ctxBg.fillRect(0, 0, blankCanvas.width, blankCanvas.height);
}

drawBlank();




// about site button
let aboutVisible = false;
const mouseCoordinates = {x: 0, y: 0};
let clicking = false;
const showAboutButton = document.getElementById('showAboutThisSite');
const aboutThisSite = document.getElementById('aboutThisSite');
const aboutText = document.getElementById('about');
const clearCanvasButton  = document.getElementById('clearCanvasButton');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const markerColorPicker = document.getElementById('markerColorPicker');
const closeAboutButton = document.getElementById('closeAboutButton');
backgroundColorPicker.value = canvasColor;

const showAboutThisSite = () => {
    aboutVisible = true;
    aboutThisSite.style.visibility = 'visible';
}

const hideAboutThisSite = () => {
    aboutVisible = false;
    aboutThisSite.style.visibility = 'hidden';
}

showAboutButton.addEventListener('click', () => {
    if (!aboutVisible) {
        showAboutThisSite();
    }
    else {
        hideAboutThisSite();
    }
});

closeAboutButton.addEventListener('click', () => {
    hideAboutThisSite();
    
});

window.addEventListener('keydown', (event)=> {
    if (event.key=='Escape' && aboutVisible) {
        hideAboutThisSite();
    }
})

aboutText.innerHTML = `
<p>This is a blank canvas.</p>
<p>Feel free to leave it blank, or use your mouse or touch to draw on it.</p>
<p>You can clear the canvas, change the background color, or change the marker color using the controls below.</p>
`;

const clearCanvas = () => {
    ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height)
}

clearCanvasButton.addEventListener('click',(event) => {
    clearCanvas();
    drawBlank();
});


backgroundColorPicker.oninput = function() {
    canvasColor = backgroundColorPicker.value;
    drawBlank();
}


// draw on the canvas

let drawColor = '#3ee059';
markerColorPicker.value = drawColor;
markerColorPicker.oninput = function() {
    drawColor = markerColorPicker.value;
}

document.body.addEventListener('mousedown',(event)=> {
    if (aboutThisSite.contains(event.target) || showAboutButton.contains(event.target)) {
        return;
    }
    clicking = true;
    const bb = blankCanvas.getBoundingClientRect();
    const x = Math.floor( (event.clientX - bb.left) / bb.width * blankCanvas.width );
    const y = Math.floor( (event.clientY - bb.top) / bb.height * blankCanvas.height );
    mouseCoordinates.x = x;
    mouseCoordinates.y = y;
    drawAtMouse();
});

document.body.addEventListener('mouseup',()=> {
    clicking = false;
})

document.body.addEventListener('mousemove',(event)=> {
    if (clicking) {
        const prevCoordinates = structuredClone(mouseCoordinates);
        const bb = blankCanvas.getBoundingClientRect();
        const x = Math.floor( (event.clientX - bb.left) / bb.width * blankCanvas.width );
        const y = Math.floor( (event.clientY - bb.top) / bb.height * blankCanvas.height );
        mouseCoordinates.x = x;
        mouseCoordinates.y = y;

        drawAtMouse(prevCoordinates);
    }
});

const drawAtMouse = (prevCoordinates=null) => {


    const circleRadius = .25;
    const lineWidth = 1;
    ctx.fillStyle = drawColor;
    ctx.strokeStyle = drawColor;



    if (prevCoordinates) {

        ctx.moveTo(prevCoordinates.x, prevCoordinates.y);
        ctx.lineTo(mouseCoordinates.x, mouseCoordinates.y);
        ctx.lineWidth = lineWidth;
        ctx.shadowBlur = 2;
        ctx.shadowColor = drawColor;
        ctx.lineJoin = "miter";
        ctx.lineCap = "round"
        ctx.stroke();
        ctx.closePath();
    }
    else {
        ctx.beginPath();
        ctx.arc(mouseCoordinates.x, mouseCoordinates.y, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}


