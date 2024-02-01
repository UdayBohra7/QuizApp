// implementing Array of objects for questions.
const questions = [
    {
        question: "What is a data structure?",
        answers: [
            {text: "A programming language", correct: false},
            {text: "A way to store and organize data", correct: true},
            {text: "A collection of algorithms", correct: false},
            {text: "A type of computer hardware", correct: false}
        ]
    },
    {
        question: "What are the disadvantages of arrays?",
        answers: [
            {text: "wastage of memory space", correct: true},
            {text: "Elements are sequentially accessed", correct: false},
            {text: "Index value of an array can be negative", correct: false},
            {text: " Data structure like queue or stack cannot be implemented", correct: false}
        ]
    },
    {
        question: "Which data structure is used for implementing recursion?",
        answers: [
            {text: "Queue", correct: false},
            {text: "List", correct: false},
            {text: "Array", correct: false},
            {text: "Stack", correct: true}
        ]
    },
    {
        question: "The data structure required for Breadth First Traversal on a graph is?",
        answers: [
            {text: "Array", correct: false},
            {text: "Queue", correct: true},
            {text: "Tree", correct: false},
            {text: "Stack", correct: false}
        ]
    },
    {
        question: "Which data structure is based on the LIFO principle?",
        answers: [
            {text: "Linked List", correct: false},
            {text: "Queue", correct: false},
            {text: "Stack", correct: true},
            {text: "Tree", correct: false}
        ]
    },
    {
        question: "What is the average time complexity of Quick Sort?",
        answers: [
            {text: "O(log(N))", correct: false},
            {text: "O(N)", correct: false},
            {text: "O(N^2)", correct: false},
            {text: "O(N log(N))", correct: true}
        ]
    },
    {
        question: "The prefix form of A-B/ (C * D ^ E) is?",
        answers: [
            {text: "-A/B*C^DE", correct: true},
            {text: "-A/BC*^DE", correct: false},
            {text: "-ABCD*^DE", correct: false},
            {text: " -/*^ACBDE", correct: false}
        ]
    }
];  // All MCQs ends here.

const question = document.getElementById("question");
const ansBtns = document.getElementById("ansContainer");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const scoreTracker = document.querySelector(".scoreTracker");

let currentQsIdx = 0;
let score = 0;
let timer;

// Main function for starting the Quiz
function startQuiz() {
    currentQsIdx = 0;
    score = 0;
    scoreTracker.innerText = `Score: ${score}`
    nextBtn.innerHTML = "Next";
    showQuestion();
}

// Display Questions
function showQuestion() {
    resetState();
    startTimer(10);
    let currentQuestion = questions[currentQsIdx];
    let questionNo = currentQsIdx + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

// Reset the overall state to the previous state.
function resetState() {
    clearInterval(timer);
    timerDisplay.innerText = "";
    nextBtn.style.display = "none";
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

// Checking answers.
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        scoreTracker.innerText = `Score: ${score}`;

    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtns.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

// Score Display
function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

// Question handler
function handleNextBtn() {
    currentQsIdx++;
    if(currentQsIdx < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

// Next Button Event
nextBtn.addEventListener("click", () => {
    if(currentQsIdx < questions.length){
        handleNextBtn();
    } else{
        startQuiz();
    }
})

// Timer for each Questions.
function startTimer(interval) {
    let timeLeft = interval;
    timerDisplay.innerText = `Time Left: ${timeLeft}`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}`;

        if(timeLeft <= 0){
            clearInterval(timer);
            handleNextBtn();
        }
    }, 1000);
}


// Start Quiz
const startBtn = document.getElementById("startBtn");
const quiz = document.querySelector(".quiz");

startBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    startBtn.style.display = "none";
    startQuiz();
});
