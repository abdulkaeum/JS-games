//import * as apiData from "./api-data.js";
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let date = new Date();
console.log(date.getTime());
const [timestamp, apiKey, hashValue] = [
    apiData.ts,
    apiData.publicKey,
    apiData.hashVal
];
button.addEventListener("click", getResult = async ()=>{
    if (InputDeviceInfo.value.trim().legnth < 1) alert("You must enter a name");
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element)=>{
        showContainer.innerHTML = `
        <div class="card-container">
            <div class="container-character-image">
                <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}">
            </div>
            <div class="character-name>
                ${element.name}
            </div>
            <div class="character-desciption>
                ${element.desciption}
            </div>
        </div>
        `;
    });
});
window.onload = ()=>{
    getResult();
};

//# sourceMappingURL=index.672d4772.js.map
