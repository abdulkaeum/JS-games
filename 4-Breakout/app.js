const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");

// all dimensions
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;

// default state
let timeId;
let xDirection = -2;
let yDirection = 2;
let score = 0;

// user start x,y position
const userStart = [230, 10];
let currentPosition = userStart;

// ball start x,y position
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// create 15 blocks with x and y position
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// create 15 all blocks
function addBlocks() {
  blocks.forEach(function (el, i) {
    const block = document.createElement("div");
    block.classList.add("block");
    // absolute position
    block.style.left = `${blocks[i].bottomLeft[0]}px`; // x axis
    block.style.bottom = `${blocks[i].bottomLeft[1]}px`; // y axis
    grid.appendChild(block);
  });
}

addBlocks();

// add the user block
const user = document.createElement("div");
user.classList.add("user");
// move the user block
drawUser();
grid.appendChild(user);

function drawUser() {
  // absolute position
  // currentPosition will have a initial x, y start
  user.style.left = `${currentPosition[0]}px`; // x axis
  user.style.bottom = `${currentPosition[1]}px`; // y axis
}

function drawBall() {
  // absolute position
  // ballCurrentPosition will have a initial x, y start
  ball.style.left = `${ballCurrentPosition[0]}px`;
  ball.style.bottom = `${ballCurrentPosition[1]}px`;
}

////////////////////////////////////////////////////////

// move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        // move 10 pixels left
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        // move 10 pixels right
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// create the ball
const ball = document.createElement("div");
ball.classList.add("ball");
// move the ball
drawBall();
grid.appendChild(ball);

function moveBall() {
  // override ballCurrentPosition every 30 secs using setInterval with these same values
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  // re-set the styling position of the ball
  drawBall();
  // each time moving the ball, remove the blocks
  checkForCollisions();
}

timeId = setInterval(moveBall, 22);

// check for block collision
function checkForCollisions() {
  blocks.forEach(function (el, i) {
    if (
      // if the ball has moved into the current block in the loop
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      // then for that block, remove from doc and array
      allBlocks[i].classList.remove("block");

      blocks.splice(i, 1);

      changDirection();

      score++;
      scoreDisplay.innerHTML = score;

      // check for win
      if (blocks.length === 0) {
        scoreDisplay.textContent = "YOU WIN";
        clearInterval(timeId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  });

  // check for wall collisons
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changDirection();
  }

  // check if the ball has collided into the user block
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changDirection();
  }

  // check if the ball ever got a left of 0
  if (ballCurrentPosition[1] <= 0) {
    // check for game over
    clearInterval(timeId);
    scoreDisplay.textContent = "You Lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
