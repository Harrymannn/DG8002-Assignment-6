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


// -------------------------
// HARRY MANN ARCHIVES QUIZ
// -------------------------

const quizQuestions = [
    {
        question: "Which area is Harry interested in combining with technology?",
        answers: [
            "Human-Centred Design",
            "Agriculture",
            "Accounting"
        ],
        correctAnswer: "Human-Centred Design"
    },

    {
        question: "Which programming language appears in Harry's skill inventory?",
        answers: [
            "Python",
            "Swift",
            "Ruby"
        ],
        correctAnswer: "Python"
    },

    {
        question: "Where did Harry's journey eventually bring him?",
        answers: [
            "Toronto",
            "Paris",
            "Tokyo"
        ],
        correctAnswer: "Toronto"
    }
];


// Keep track of the quiz state
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let questionAnswered = false;


// Get elements from the webpage
const questionText = document.getElementById("questionText");
const answerChoices = document.getElementById("answerChoices");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const nextQuestionButton = document.getElementById("nextQuestionButton");
const quizFeedback = document.getElementById("quizFeedback");
const quizScore = document.getElementById("quizScore");
const questionNumber = document.getElementById("questionNumber");


// Display a quiz question
function displayQuestion() {

    const question = quizQuestions[currentQuestion];

    questionText.textContent = question.question;

    answerChoices.innerHTML = "";

    selectedAnswer = "";
    questionAnswered = false;

    quizFeedback.textContent = "";

    question.answers.forEach(function(answer) {

        const label = document.createElement("label");
        const radioButton = document.createElement("input");

        radioButton.type = "radio";
        radioButton.name = "quizAnswer";
        radioButton.value = answer;

        // CHANGE EVENT
        radioButton.addEventListener("change", function() {
            selectedAnswer = answer;

            quizFeedback.textContent =
                "You selected: " + answer;
        });

        label.appendChild(radioButton);
        label.appendChild(document.createTextNode(" " + answer));

        answerChoices.appendChild(label);
        answerChoices.appendChild(document.createElement("br"));
    });

    quizScore.textContent = score;
    questionNumber.textContent = currentQuestion + 1;
}


// CLICK EVENT - Check the selected answer
checkAnswerButton.addEventListener("click", function() {

    if (selectedAnswer === "") {
        quizFeedback.textContent =
            "Please select an answer before checking.";
        return;
    }

    if (questionAnswered) {
        quizFeedback.textContent =
            "You already answered this question. Click Next Question.";
        return;
    }

    const correctAnswer =
        quizQuestions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {

        score++;

        quizFeedback.textContent =
            "Correct! Great job.";

        quizFeedback.className = "correct-answer";

    } else {

        quizFeedback.textContent =
            "Incorrect. The correct answer is " +
            correctAnswer + ".";

        quizFeedback.className = "wrong-answer";
    }

    questionAnswered = true;
    quizScore.textContent = score;
});


// CLICK EVENT - Move to next question
nextQuestionButton.addEventListener("click", function() {

    if (!questionAnswered) {
        quizFeedback.textContent =
            "Please answer the current question first.";
        return;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        displayQuestion();

    } else {

        questionText.textContent = "Quiz Complete!";

        answerChoices.innerHTML = "";

        checkAnswerButton.style.display = "none";
        nextQuestionButton.style.display = "none";

        quizFeedback.className = "";

        quizFeedback.textContent =
            "Final Score: " + score +
            " out of " + quizQuestions.length;
    }
});


// KEYBOARD EVENT
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && selectedAnswer !== "") {
        checkAnswerButton.click();
    }
});


// Load the first question
displayQuestion();


// -------------------------
// ACTIVITY 10 - CAT API
// -------------------------

const catButton = document.getElementById("catButton");
const catImage = document.getElementById("catImage");
const catStatus = document.getElementById("catStatus");
const catDetails = document.getElementById("catDetails");

async function getRandomCat() {

    catStatus.textContent = "Loading a random cat...";
    catImage.hidden = true;
    catDetails.textContent = "";
    catButton.disabled = true;

    try {

        const response = await fetch(
            "https://api.thecatapi.com/v1/images/search",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve data.");
        }

        const data = await response.json();

        const cat = data[0];

        catImage.src = cat.url;
        catImage.hidden = false;

        catStatus.textContent =
            "Cat image successfully retrieved!";

        catDetails.textContent =
            "Image ID: " + cat.id +
            " | Dimensions: " + cat.width +
            " x " + cat.height + " pixels";

    } catch (error) {

        catStatus.textContent =
            "Unable to retrieve a cat right now. Please try again.";

        catImage.hidden = true;

    } finally {

        catButton.disabled = false;

    }

}

catButton.addEventListener("click", getRandomCat);
