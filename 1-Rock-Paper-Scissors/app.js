const computerChoiceDisplay = document.getElementById("computer-choice");
const myChoiceDisplay = document.getElementById("my-choice");
const resultDisplay = document.getElementById("result");

const possibleChoices = document.querySelectorAll("button");

let myChoice, computerChoice, result;

possibleChoices.forEach(function (possibleChoice) {
  possibleChoice.addEventListener("click", function (e) {
    myChoiceDisplay.innerText = myChoice = e.target.id;
    generateComputerChoice();
    getResult();
  });
});

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;

  switch (randomNumber) {
    case 1:
      computerChoice = computerChoiceDisplay.innerText = "rock";
      break;
    case 2:
      computerChoice = computerChoiceDisplay.innerText = "paper";
      break;
    case 3:
      computerChoice = computerChoiceDisplay.innerText = "scissors";
      break;
    default:
      console.log("generateComputerChoice: error");
  }
}

function getResult() {
  // check to see which case expressison returns true to match true
  switch (true) {
    case computerChoice === myChoice:
      result = resultDisplay.innerText = "draw";
      break;
    case computerChoice === "rock" && myChoice === "paper":
      result = resultDisplay.innerText = "you win";
      break;
    case computerChoice === "rock" && myChoice === "scissors":
      result = resultDisplay.innerText = "you lost";
      break;
    case computerChoice === "paper" && myChoice === "scissors":
      result = resultDisplay.innerText = "you win";
      break;
    case computerChoice === "paper" && myChoice === "rock":
      result = resultDisplay.innerText = "you lose";
      break;
    case computerChoice === "scissors" && myChoice === "rock":
      result = resultDisplay.innerText = "you win";
      break;
    case computerChoice === "scissors" && myChoice === "paper":
      result = resultDisplay.innerText = "you lose";
      break;
    default:
      console.log("getResult: error");
  }
}
