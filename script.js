const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let reaveling = false;
let canvasFull = false;

function isCanvasFull() {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const totalPixels = pixels.length / 4; // Each pixel has 4 components (RGBA)
  let filledPixels = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] !== 0) {
      // Check if the alpha channel is non-transparent
      filledPixels++;
    }
  }

  const filledPercentage = (filledPixels / totalPixels) * 100;
  if (filledPercentage >= 70) {
    canvasFull = true
    return true;
  }
}

function draw(X, Y) {
  context.beginPath();
  context.arc(X, Y, 100, 0, 2 * Math.PI);
  context.fillStyle = "white";
  context.fill();
  context.strokeStyle = "transparent";
  context.stroke();
  context.closePath();
}

function drawText() {
  // const gradient = context.createLinearGradient(0, 0, canvas.width, 0);

  // // Add color stops to the gradient
  // gradient.addColorStop(0, "red"); // Middle color
  // gradient.addColorStop(0.4, "blue"); // End color
  // gradient.addColorStop(1, "pink"); // Start color

  // context.fillStyle = gradient;
  // context.textAlign = "center";
  // context.font = "bolder 1.8rem Edu VIC WA NT Beginner";
  // context.strokeStyle = "black";
  // context.lineWidth = 1;
  // context.fillText("HAPPY RAKSHABANDHAN!!", window.innerWidth / 2, window.innerHeight / 2 );
  // context.strokeText("HAPPY RAKSHABANDHAN!!", window.innerWidth / 2, window.innerHeight / 2 );
  document.querySelector('h1').classList.add('show');
}

function rakhiAnime() {
  for (let i = 1; i <= 4; i++) {
    document.querySelector(`#rakhi${i}`).classList.add('move')
  }
}

// for pointer devices
canvas.addEventListener("mousedown", (e) => {
    draw(e.pageX, e.pageY);
    // canvasFull && drawText();
    reaveling = true;
});
canvas.addEventListener("mousemove", (e) => {
    reaveling && draw(e.pageX, e.pageY);
    // canvasFull && drawText();
});
canvas.addEventListener("mouseup", (e) => {
    draw(e.pageX, e.pageY);
    // canvasFull && drawText();
    reaveling = false;
});

// for touch devices
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    draw(e.touches[0].pageX, e.touches[0].pageY);
    // canvasFull && drawText();
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    draw(e.touches[0].pageX, e.touches[0].pageY);
    // canvasFull && drawText();
});
canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    draw(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    // canvasFull && drawText();
});

let checkCanvas;
checkCanvas = setInterval(() => {
  if (isCanvasFull()) {
    drawText();
    rakhiAnime();
    clearInterval(checkCanvas);
  }
}, 500);
