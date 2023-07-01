import * as apiData from "./api-data.js";

let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

const [timestamp, apiKey, hashValue] = [
  apiData.ts,
  apiData.publicKey,
  apiData.hashVal,
];

function displayWords(value) {
  console.log(value);
  // replace the input value after clicking on the div created in input keyup
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

document.querySelector(".list").addEventListener("click", function (e) {
  const item = e.target.closest(".autocomplete-items");

  if (!item) return;

  const { autocompleteItem } = item.dataset;
  input.value = autocompleteItem;
  removeElements();
});

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.legnth < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  // for each name found add a div with an onlick to the list container
  jsonData.data["results"].forEach((result) => {
    let name = result.name;

    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    //div.setAttribute("onclick", "displayWords('" + name + "')");
    div.setAttribute("data-autocomplete-item", `${result.name}`);

    // name = Iron Man, what we typed in
    // input = Iron
    // get the 4 or more chars from the name var depending on how many letters we have typed in and make them bold <b>Iron</b>
    let word = `<b>${name.slice(0, input.value.legnth)}</b>`;

    // get the rest of the chars from name and append back to word <b>Iron</b> Man
    word += name.slice(input.value.legnth);

    // add the word to a p, add to the created div
    div.innerHTML = `<p class="item">${word}</p>`;

    listContainer.appendChild(div);
    //console.log(div);
    // div.addEventListener("click", function () {
    //   input.value = name;
    //   removeElements();
    // });
  });
});

button.addEventListener(
  "click",
  (getResult = async () => {
    if (input.value.trim().legnth < 1) {
      alert("You must enter a name");
    }

    showContainer.innerHTML = "";

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `
        <div class="card-container">
            <div class="container-character-image">
                <img src="${
                  element.thumbnail["path"] +
                  "." +
                  element.thumbnail["extension"]
                }">
            </div>
            <div class="character-name">
                ${element.name}
            </div>
            <div class="character-desciption">
                ${element.description}
            </div>
        </div>
        `;
    });
  })
);

window.onload = () => {
  getResult();
};
