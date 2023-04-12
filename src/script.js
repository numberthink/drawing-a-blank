

// draw "blank" (or white) canvas
const canvas = document.getElementById("blankCanvas");
const ctx = canvas.getContext("2d");
const drawBlank = () => {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
showAboutButton.addEventListener('click', () => {
    if (!aboutVisible) {
        showAboutThisSite();
    }
    else {
        hideAboutThisSite();
    }
});

aboutText.innerHTML = `
<p>This is a blank canvas that I drew.</p>
<p>Feel free to leave it blank, or use your mouse or touch to draw on it.</p>
<p>You can clear the canvas or change the background color using the controls below.</p>
`;

clearCanvasButton.addEventListener('click',(event) => {
    if (!aboutThisSite.contains(event.target)) {
        drawBlank();
    }
});

document.body.addEventListener('mousedown',(event)=> {
    clicking = true;
    const bb = canvas.getBoundingClientRect();
    const x = Math.floor( (event.clientX - bb.left) / bb.width * canvas.width );
    const y = Math.floor( (event.clientY - bb.top) / bb.height * canvas.height );
    mouseCoordinates.x = x;
    mouseCoordinates.y = y;
    drawAtMouse();
});

document.body.addEventListener('mouseup',()=> {
    clicking = false;
})

document.body.addEventListener('mousemove',(event)=> {
    if (clicking) {
        const bb = canvas.getBoundingClientRect();
        const x = Math.floor( (event.clientX - bb.left) / bb.width * canvas.width );
        const y = Math.floor( (event.clientY - bb.top) / bb.height * canvas.height );
        mouseCoordinates.x = x;
        mouseCoordinates.y = y;
        drawAtMouse();
    }
});

const drawAtMouse = () => {

    const drawWidth = 12;
    const drawHeight = 12;
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.roundRect(mouseCoordinates.x-drawWidth*.5,mouseCoordinates.y-drawHeight*.5, drawWidth, drawHeight, [drawWidth]);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

const showAboutThisSite = () => {
    aboutVisible = true;
    aboutThisSite.style.visibility = 'visible';
}

const hideAboutThisSite = () => {
    aboutVisible = false;
    aboutThisSite.style.visibility = 'hidden';
}

