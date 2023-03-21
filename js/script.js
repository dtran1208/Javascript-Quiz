const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const timeEl = document.getElementById('time');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const highScoreForm = document.getElementById('high-score-form');
const initialsEl = document.getElementById('initials');
const initialTime = 60;

const questions = [

  {
    question: 'What is the correct syntax for referring to an external script called "script.js"?',
    choices: [
      '<script src="script.js">',
      '<script href="script.js">',
      '<script name="script.js">',
      '<script link="script.js">'
    ],
    correctIndex: 0
  },
  {
    question: 'Which of the following is NOT a valid JavaScript variable name?',
    choices: [
      'myVariable',
      '_myVariable',
      '$myVariable',
      '2myVariable'
    ],
    correctIndex: 3
  },
  {
    question: 'How do you create a function in JavaScript?',
    choices: [
      'function myFunction()',
      'function:myFunction()',
      'function = myFunction()',
      'myFunction()'
    ],
    correctIndex: 0
  },
  {
    question: 'How do you call a function named "myFunction" in JavaScript?',
    choices: [
      'myFunction()',
      'call myFunction()',
      'call function myFunction()',
      'myFunction'
    ],
    correctIndex: 0
  },
  {
    question: 'Which event occurs when the user clicks on an HTML element?',
    choices: [
      'onclick',
      'onmouseover',
      'onchange',
      'onmouseup'
    ],
    correctIndex: 0
  },
];

let currentQuestionIndex = 0;
let timeLeft = 60;

function startQuiz() {
timeLeft = initialTime;
score = 0;
startBtn.parentElement.hidden = true;
timerEl.hidden = false;
timeEl.textContent = timeLeft;
 countdown();
showQuestion();
}

function countdown() {
    const timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
  
      if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
  
    choicesEl.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.textContent = `${index + 1}. ${choice}`;
      button.classList.add('choice-btn');
      button.addEventListener('click', () => checkAnswer(index));
      choicesEl.appendChild(button);
    });
  
    document.getElementById('question-screen').hidden = false;
  }
  
  function checkAnswer(index) {
    const correctIndex = questions[currentQuestionIndex].correctIndex;
  
    if (index === correctIndex) {
        score+= 10;
    } else{
      timeLeft -= 10;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }
  
  function endGame() {
    document.getElementById('question-screen').hidden = true;
    timerEl.hidden = true;
    endScreen.hidden = false;
    score = initialTime - timeLeft;
    finalScoreEl.textContent = score;
  }
  
  highScoreForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const initials = initialsEl.value.toUpperCase();
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
    highScores.push({initials, score: initialTime - timeLeft });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Redirect to high scores page or show a success message
  });
  
  startBtn.addEventListener('click', startQuiz);    