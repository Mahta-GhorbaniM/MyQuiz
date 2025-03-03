
let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let currentQuestions = [];
let incorrectAnswers = [];
let questionCount = 0;
let timer;
let timeOutAnswers = [];
let timeLeft = 10;

function startQuiz(category) {
    currentCategory = category;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("question-count").style.display = "block";
}

function setQuestionCount(count) {
    questionCount = count;
    currentQuestions = [...questions[currentCategory]];

    console.log("Total antal frågor för", currentCategory, ":", currentQuestions.length);

    if (currentQuestions.length < questionCount) {
        questionCount = currentQuestions.length;
    }

    console.log("Valt antal frågor:", questionCount);

    currentQuestions = currentQuestions.slice(0, questionCount);
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("question-count").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();
}

function showQuestion() {
    const questionData = currentQuestions[currentQuestionIndex];
    document.getElementById("question-text").textContent = `Fråga ${currentQuestionIndex + 1}: ${questionData.question}`;

    const answerOptions = document.getElementById("answer-options");
    answerOptions.innerHTML = "";

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option, button);
        answerOptions.appendChild(button);
    });

    document.getElementById("next-question").style.display = "none";
    document.getElementById("timer").style.display = "block";
    timeLeft = 10;
    document.getElementById("time-left").textContent = timeLeft;

    startTimer();
}


function startTimer() {
    timeLeft = 10;
    document.getElementById("time-left").textContent = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;

        if (timeLeft <= 0)  {
            clearInterval(timer);
            showCorrectAnswer();
            document.getElementById("next-question").style.display = "block";
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(timer);
}

function checkAnswer(selectedAnswer, clickedButton) {
    const correctAnswer = currentQuestions[currentQuestionIndex].answer;
    const allButtons = document.querySelectorAll("#answer-options button");

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        clickedButton.style.background = "green";
        score++;
    } else {
        clickedButton.style.background = "red";
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.style.background = "green";
            }
        });
        incorrectAnswers.push(currentQuestions[currentQuestionIndex].question);
    }

    stopTimer();
    document.getElementById("next-question").style.display = "block";
}

function showCorrectAnswer() {
    const correctAnswer = currentQuestions[currentQuestionIndex].answer;
    const allButtons = document.querySelectorAll("#answer-options button");

    allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.style.background = "green";
        }
        btn.disabled = true;
    });

    if (timeLeft <= 0) {
        document.getElementById("result-text").textContent = `Tiden är slut! Rätt svar är: ${correctAnswer}`;
        timeOutAnswers.push(currentQuestions[currentQuestionIndex].question);
    }

    document.getElementById("next-question").style.display = "block";
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        setTimeout(showQuestion, 1000);
        document.getElementById("next-question").style.display = "none";
    } else {
        showResult(); 
    }
}

function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result-text").textContent = `Du fick ${score} av ${questionCount} rätt!`;
    
    if (incorrectAnswers.length > 0) {
        const incorrectText = `Du svarade fel på följande frågor:\n${incorrectAnswers.join("\n")}`;
        document.getElementById("incorrect-answers").textContent = incorrectText;
    }

    if (timeOutAnswers.length > 0) {
        const timeoutText = `Tiden gick ut på följande frågor:\n${timeOutAnswers.join("\n")}`;
        document.getElementById("timeout-answers").textContent = timeoutText;
    }
    document.getElementById("restart-quiz").addEventListener("click", restartQuiz);
    document.getElementById("go-to-start").addEventListener("click", goToStart);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    incorrectAnswers = [];
    timeOutAnswers = [];

    document.getElementById("result-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();
}

function goToStart() {
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "none";

    currentCategory = "";
    currentQuestionIndex = 0;
    score = 0;
    currentQuestions = [];
    questionCount = 0;
    timeLeft = 10;
}
