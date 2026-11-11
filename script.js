// DG8002 - Activity 8
// TAG-Me Interactive Edition
// Harry Mann


// -------------------------
// LIGHT / DARK MODE
// -------------------------

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "Switch to Light Mode";
    } else {
        themeButton.textContent = "Switch to Dark Mode";
    }

});


// -------------------------
// RANDOM FACT GENERATOR
// -------------------------

const facts = [
    "I have worked with Python, HTML, CSS, Arduino, and robotics.",
    "I enjoy combining technology with user experience and design.",
    "I have a background in Information Technology.",
    "I enjoy experimenting with new digital technologies.",
    "I somehow always find one more change to make after calling something the final version."
];

const factButton = document.getElementById("factButton");
const factDisplay = document.getElementById("factDisplay");

factButton.addEventListener("click", function () {

    const randomNumber = Math.floor(Math.random() * facts.length);

    factDisplay.textContent = facts[randomNumber];

});


// -------------------------
// PERSONALIZED GREETING
// -------------------------

const nameInput = document.getElementById("nameInput");
const greetingButton = document.getElementById("greetingButton");
const greetingDisplay = document.getElementById("greetingDisplay");

greetingButton.addEventListener("click", function () {

    const visitorName = nameInput.value.trim();

    if (visitorName === "") {
        greetingDisplay.textContent = "Please enter your name first.";
    } else {
        greetingDisplay.textContent =
            "Welcome to The Harry Mann Archives, " + visitorName + "!";
    }

});
