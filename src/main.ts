import "./style.css";
import "./main.css";
import ball from "./assets/ball.png";

const zone: number = 20;
const app = document.getElementById("app")!;
const dongball = document.createElement("img");
const counter = document.createElement("h1");

let count = -1;

function updateCount() {
  count++;
  counter.textContent = `The dongball has hit the wall ${count} times.`;
}

updateCount();
counter.id = "counter";

document.body.appendChild(counter);

dongball.draggable = false;
dongball.id = "dongball";
dongball.setAttribute("src", ball);
dongball.style.imageRendering = "pixelated";
dongball.style.position = "absolute";
app.style.borderWidth = `${zone / 2}px`;
app.appendChild(dongball);

let ballX = window.innerWidth / 2.5;
let ballY = window.innerHeight / 2.5;
let ballVelocityX = 10;
let ballVelocityY = 10;
const ballSize = 100;

function updateBallPosition() {
  ballX += ballVelocityX;
  ballY += ballVelocityY;

  if (ballX <= 0) {
    ballVelocityX = -ballVelocityX;
    ballX = 0;
    updateCount();
  }

  if (ballX + ballSize >= app.offsetWidth) {
    ballVelocityX = -ballVelocityX;
    ballX = app.offsetWidth - ballSize;
    updateCount();
  }

  if (ballY <= 0) {
    ballVelocityY = -ballVelocityY;
    ballY = 0;
    updateCount();
  }

  if (ballY + ballSize >= app.offsetHeight) {
    ballVelocityY = -ballVelocityY;
    ballY = app.offsetHeight - ballSize;
    updateCount();
  }

  dongball.style.left = `${ballX}px`;
  dongball.style.top = `${ballY}px`;
}

function gameLoop() {
  updateBallPosition();
  requestAnimationFrame(gameLoop);
}

gameLoop();
