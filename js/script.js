//API used: https://newsapi.org/s/india-news-api
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

// "in" stands for India
const country = "in";

const options = [
    "General", "Entertainment", "Health", "Sports", "Tech"
];

//100 Request per Day
let requestURL;

//Create cards fro the data
const generateUI = (articles) => {
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
            ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class="view-button">Click Here To Read More!</a>
        </div>`;
        container.appendChild(card);
    }
};

//News API Call\
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data Unavailable Right Now. Please try again later!");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

//Category Selections
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    //requestURL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9fd7858be5b24e719c71055f45316e4f`;
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;

    e.target.classList.add(".active");
    getNews();
};

const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""
            }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    // requestURL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9fd7858be5b24e719c71055f45316e4f`
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};