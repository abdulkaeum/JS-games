"use script";

const message = document.querySelector(".message");
const scoreDisplay = document.querySelector(".score");
const number = document.querySelector(".number");
const body = document.querySelector("body");
const highScoreDisplay = document.querySelector(".highscore");

const displayMessage = function (htmlElement, message) {
  htmlElement.textContent = message;
};

const genSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const resetGameAgain = function () {
  secretNumber = genSecretNumber();
  console.log("secretNumber: ", secretNumber);

  score = 20;
  displayMessage(scoreDisplay, score);
  displayMessage(message, "Start guessing");
  displayMessage(number, "?");
  body.style.backgroundColor = "#222";
  number.style.width = "15rem";
  document.querySelector(".guess").value = "";
};


let score = 20;
let highScore = 0;
let secretNumber = 0;
secretNumber = genSecretNumber();
console.log("secretNumber: ", secretNumber);

document.querySelector(".check").addEventListener("click", function () {
  const guess = +document.querySelector(".guess").value;

  if (!guess) {
    displayMessage(message, "No number!");
  } else if (guess === secretNumber) {
    displayMessage(message, "Correct number!");
    score++;
    displayMessage(scoreDisplay, score);
    displayMessage(number.textContent, secretNumber);
    body.style.backgroundColor = "#60b347";
    number.style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      displayMessage(highScoreDisplay, highScore);
    }

    setTimeout(resetGameAgain, 2000);
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      displayMessage(message, guess > secretNumber ? "Too high!" : "Too low");
      displayMessage(scoreDisplay, score);
    } else {
      displayMessage(message, "Game over!");
      displayMessage(scoreDisplay, 0);
      body.style.backgroundColor = "red";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  secretNumber = genSecretNumber();
  console.log("secretNumber: ", secretNumber);

  score = 20;
  displayMessage(scoreDisplay, score);
  displayMessage(message, "Start guessing");
  displayMessage(number, "?");
  body.style.backgroundColor = "#222";
  number.style.width = "15rem";
  document.querySelector(".guess").value = "";
});
