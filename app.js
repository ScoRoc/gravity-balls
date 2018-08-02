let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let gravity = 1;
let friction = 0.95;

let numOfBalls = 200;

canvas.addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

canvas.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

canvas.addEventListener('click', () => {
  init();
});

let randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let randomColor = () => {
  let color = '#';
  let hex = '1234567890ABCDEF';
  for (let i = 0; i < 6; i++) {
    color = color + hex[Math.floor(Math.random() * 16)];
  };
  return color;
};

let randomRGBA = (opacity) => {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  };

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
};

let ball = null;
let ballArr = [];

let init = () => {
  ballArr = [];
  for (let i = 0; i < numOfBalls; i++) {
    let radius = randomIntFromRange(8, 50);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    // ballArr.push(new Ball(x, y, dx, dy, radius, randomColor()));
    ballArr.push(new Ball(x, y, dx, dy, radius, randomRGBA(0.9)));
  }

};

let animate = () => {
  // requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArr.length; i++) {
  ballArr[i].update();
};
  requestAnimationFrame(animate);
};

init();
animate();
