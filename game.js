const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const radius = 10;
const speed = [3, -3];
const playerSpeed = 10;

canvas.height = 600;
canvas.width = 900;

let x = 450 - radius;
let y = Math.random()*(300 - radius);
let isStopped = false;

let velocityX = speed[Math.floor(Math.random()*speed.length)];
let velocityY = speed[Math.floor(Math.random()*speed.length)];

class Player {
  constructor(x) {
    this.point = 0;
    this.x = x;
    this.y = 300 - 35;
  }
  up() {
    this.y = this.y - playerSpeed;
  }
  down() {
    this.y = this.y + playerSpeed;
  }
  play() {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 241, 241)';
    ctx.fillRect(this.x, this.y, 10, 70);
  }
  reset() {
    this.y = 300 - 35;
    this.x = this.x;
  }
}

const playerOne = new Player(30);
const playerTwo = new Player(canvas.width - 40);

const ball = {
  move: function() {
    x = x + velocityX;
    y = y + velocityY;
  },
  bounce: function() {
    if (y + radius >= canvas.height || y <= 0 + radius) {
      velocityY = 0 - velocityY;
    }
    if ((playerOne.y <= y && playerOne.y + 70 >= y) && ((x >= 40) && (x <= 43))) {
      velocityX = 0 - velocityX;
    }
    if ((playerTwo.y <= y && playerTwo.y + 70 >= y) && ((x + radius >= (canvas.width-40)) && (x <= (canvas.width-40) + 3))) {
      velocityX = 0 - velocityX;
    }
  },
  draw: function() {
    this.move();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 241, 241)';
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.moveTo((canvas.width/2) - 2, 0);
    ctx.lineTo((canvas.width/2) - 2, canvas.height);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 241, 241, 0.5)';
    ctx.stroke();
    printPoint(playerOne.point, 70, 40);
    printPoint(playerTwo.point, (canvas.width - 70), 40);
    playerOne.play();
    playerTwo.play();
    this. bounce();
    if (x <= 0 || x >= canvas.width) {
      result();
    }
  }
}
ball.draw();

let then = Date.now();
function animation() {
  if (isStopped) {
    let now = Date.now();
    ball.draw();
    if ((now - then) > 1000 / 40) {
      moveMent();
      then = Date.now();
    }
  } else {
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(255, 241, 241)";
    ctx.fillText('space to start', 450, 300);
    ctx.fillText('and pause the game', 450, 350);
  }
  requestAnimationFrame(animation);
}
animation();

let keysPressed = {};

document.addEventListener('keydown', (e) => {keyHandle(e.key)});
document.addEventListener('keyup', (e) => {
  if (keysPressed[e.key] != true) return;
  delete keysPressed[e.key];
})

function keyHandle(key) {
  switch (key) {
    case 'w':
      keysPressed[key] = true;
      break;
    case 's':
      keysPressed[key] = true;
      break;
    case 'ArrowUp':
      keysPressed[key] = true;
      break;
    case 'ArrowDown':
      keysPressed[key] = true;
      break;
    case ' ':
      pause();
      break;
    default:
      return;
  }
}

function moveMent() {
  for (key in keysPressed) {
    if (key == 'w') {
      if (!(playerOne.y <= 0)) {
        playerOne.up();
      }
    }
    else if (key == 's') {
      if (!(playerOne.y >= canvas.height - 70)) {
        playerOne.down();
      }
    }
    else if (key == 'ArrowUp') {
      if (!(playerTwo.y <= 0)) {
        playerTwo.up();
      }
    }
    else if (key == 'ArrowDown') {
      if (!(playerTwo.y >= canvas.height - 70 )) {
        playerTwo.down();
      }
    }
  }
}

function pause() {
  if (isStopped) {
    isStopped = false;
  } else {
    isStopped = true;
  }
}

function result() {
  if (x >= canvas.width) {
    playerOne.point++;
    printPoint(playerOne.point, 70, 10);
  } else {
    playerTwo.point++;
    printPoint(playerTwo.point, (canvas.width - 70), 10);
  }
  playerOne.reset();
  playerTwo.reset();
  x = 450 - radius;
  y = 300 - radius;
  velocityX = speed[Math.floor(Math.random()*speed.length)];
  velocityY = speed[Math.floor(Math.random()*speed.length)];
}

function printPoint(point, x, y) {
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgb(255, 241, 241)";
  ctx.fillText(`${point}`, x, y);
}