const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.getElementById("time-left");
const score = document.getElementById("score");

let result = 0,
  hitPosition,
  currentTime = 15;

function randomSquare() {
  // remove the mole class
  squares.forEach(function (square) {
    square.classList.remove("mole");
  });

  // get a random square and add the mole class
  let randomPositionSquare = squares[Math.floor(Math.random() * 9)];
  randomPositionSquare.classList.add("mole");

  hitPosition = randomPositionSquare.id;
}

function moveMole() {
  let timerId = null;
  timerId = setInterval(randomSquare, 1300);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    alert(`GAME OVER!! ${result}`);
    timeLeft.textContent = currentTime = 15;
    score.textContent = result = 0;
  }
}

let countDownTimerId = setInterval(countDown, 1000);

squares.forEach(function (square) {
  square.addEventListener("mousedown", function () {
    console.log(square.id, hitPosition);
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      // re-set the mole position so it can start again ona new one
      hitPosition = null;
    }

    if (result === 10) {
      alert(`YOU WIN!! ${result}`);
      timeLeft.textContent = currentTime = 15;
      score.textContent = result = 0;
    }
  });
});
