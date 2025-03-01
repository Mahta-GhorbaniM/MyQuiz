const questions = {
    math: [
        {
            question: "Det är -20 grader ute. Lite senare är det 3 grader kallare. Klicka på knappen med rätt uträkning och rätt svar!", 
            options: ["-20 + 3 = -23", "-20 - 3 = -23", "-20 + (-3) = -17", "-3 - (-20) = -22"], 
            answer: "-20 - 3 = -23"
        },
        {
            question: "Vad är -7 * 8?", 
            options: ["56", "-48", "-56", "-67"], 
            answer: "-56"
        },
        {
            question: "Vad är roten av 144?", 
            options: ["12", "14", "13", "15"], 
            answer: "12"
        },
        {
            question: "En tröja kostar 80kr. Den sänks med 10%. Vad är nya priset?", 
            options: ["70kr", "72kr", "78kr", "75kr"], 
            answer: "72kr"
        }
    ],
    geo: [
        {
            question: "Vad heter världens längsta flod?",
            options: ["Amazonas", "Nilen", "Yangtze", "Mississippi"], 
            answer: "Nilen"
        },
        {
            question: "Vilket land har flest invånare?",
            options: ["USA", "Indien", "Kina", "Brasilien"],
            answer: "Kina"
        },
        {
            question: "Vilket är Europas största land?", 
            options: ["Tyskland", "Frankrike", "Spanien", "Ryssland"], 
            answer: "Ryssland"
        },
        {
            question: "Vilken är världens största ö?", 
            options: ["Grönland", "Madagaskar", "Borneo", "Australien"], 
            answer: "Grönland"
        }
    ]
};

let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];

function startQuiz(category) {
    currentCategory = category;
    currentQuestions = [...questions[category]]; 
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("result-screen").style.display = "none";

    showQuestion();
}

function showQuestion() {
    const questionData = currentQuestions[currentQuestionIndex];
    document.getElementById("question-text").textContent = questionData.question;

    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = "";

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        answerOptions.appendChild(button);
    });

    document.getElementById("next-question").style.display = "none";
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === currentQuestions[currentQuestionIndex].answer) {
        score++;
    }
    document.getElementById("next-question").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result-text").textContent = `Du fick ${score} av ${currentQuestions.length} rätt!`;
}

function restartQuiz() {
    startQuiz(currentCategory);
}

function goToStart() {
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "none";
}
