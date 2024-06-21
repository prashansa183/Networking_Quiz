const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "What does IP stand for in networking?",
    "choice1": "Internet Protocol",
    "choice2": "Internal Protocol",
    "choice3": "Intranet Protocol",
    "choice4": "Internet Process",
    "answer": 1
  },
  {
    "question": "Which protocol is used to send email?",
    "choice1": "HTTP",
    "choice2": "SMTP",
    "choice3": "FTP",
    "choice4": "SNMP",
    "answer": 2
  },
  {
    "question": "Which device is used to connect different networks?",
    "choice1": "Router",
    "choice2": "Switch",
    "choice3": "Hub",
    "choice4": "Repeater",
    "answer": 1
  },
  {
    "question": "What does DNS stand for?",
    "choice1": "Domain Name Server",
    "choice2": "Domain Network Service",
    "choice3": "Domain Name System",
    "choice4": "Domain Network System",
    "answer": 3
  },
  {
    "question": "Which layer of the OSI model is responsible for routing?",
    "choice1": "Application Layer",
    "choice2": "Transport Layer",
    "choice3": "Network Layer",
    "choice4": "Data Link Layer",
    "answer": 3
  },
  {
    "question": "What is the purpose of a firewall in networking?",
    "choice1": "To manage network devices",
    "choice2": "To block unauthorized access",
    "choice3": "To monitor network performance",
    "choice4": "To encrypt data",
    "answer": 2
  },
  {
    "question": "Which of the following is a private IP address?",
    "choice1": "192.168.0.1",
    "choice2": "172.16.0.1",
    "choice3": "10.0.0.1",
    "choice4": "All of the above",
    "answer": 4
  },
  {
    "question": "What does VPN stand for?",
    "choice1": "Virtual Private Network",
    "choice2": "Virtual Public Network",
    "choice3": "Visual Private Network",
    "choice4": "Virtual Protected Network",
    "answer": 1
  },
  {
    "question": "Which protocol is used to securely transfer files over the Internet?",
    "choice1": "FTP",
    "choice2": "HTTP",
    "choice3": "SFTP",
    "choice4": "SMTP",
    "answer": 3
  },
  {
    "question": "What is the function of a MAC address?",
    "choice1": "To identify devices on a network",
    "choice2": "To route data packets",
    "choice3": "To encrypt data",
    "choice4": "To manage network traffic",
    "answer": 1
  }
]
;

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();