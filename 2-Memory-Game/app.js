const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
];

// a quick way to sort the array in random order
// is 0.5 > than Math.random() for each element
cardArray.sort(() => 0.5 - Math.random());
const gridDisplay = document.querySelector("#grid");
const result = document.querySelector("#result");
let cardTitlesChosen = [];
let cardChosenIDs = [];
const cardsWon = [];

function creatBoard() {
  cardArray.forEach((element, i) => {
    // <img>
    const card = document.createElement("img");
    // <img src="images/blank.png">
    card.setAttribute("src", "images/blank.png");
    // <img src="images/blank.png" data-id="0">
    card.setAttribute("data-id", i);

    card.addEventListener("click", flipCard);

    gridDisplay.appendChild(card);
  });
}
creatBoard();
console.log(cardArray);

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneId = cardChosenIDs[0];
  const optionTwoId = cardChosenIDs[1];

  // if they select the same card
  if (optionOneId === optionTwoId) {
    alert("You chose the same card");
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
  }

  // if pizza === pizza
  else if (cardTitlesChosen[0] === cardTitlesChosen[1]) {
    alert("Correct!");
    // replace the selected matched/pair cards to white.png
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");

    // dont allow to click the cards again
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);

    // store the score
    cardsWon.push(cardTitlesChosen[0]);
    cardsWon.push(cardTitlesChosen[1]);
  } else {
    // revert the cards back
    alert("Try again!");
    cards[cardChosenIDs[0]].setAttribute("src", "images/blank.png");
    cards[cardChosenIDs[1]].setAttribute("src", "images/blank.png");
  }

  console.log(cardChosenIDs, cardTitlesChosen, cardsWon);
  result.textContent = cardsWon.length;
  cardTitlesChosen = [];
  cardChosenIDs = [];

  if (cardsWon.length / 12 === cardArray.length / 12) {
    console.log("all");
    // reset the current game/turn
    result.textContent = "Winner Winner Chicken Dinner!";
  }
}

function flipCard(e) {
  const id = e.target.dataset.id;
  const chosenObj = cardArray[id];
  cardTitlesChosen.push(chosenObj.name);
  cardChosenIDs.push(id);
  e.target.setAttribute("src", chosenObj.img);
  // if the they have clicked twice / chosen two cards
  if (cardTitlesChosen.length === 2) {
    console.log("L: ", cardTitlesChosen);
    setTimeout(checkMatch, 500);
  }
}
