// Variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

// Sound effects
var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  // Hide start screen
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  // Un-hide questions section
  questionsEl.removeAttribute('class');

  // Start timer
  timerId = setInterval(clockTick, 1000);

  // Show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // Update title with current question
  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  // Clear out any old question choices
  choicesEl.innerHTML = '';

  // Loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // Create new button for each choice
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;

    // Attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // Display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // Check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    sfxWrong.play();
    feedbackEl.textContent = 'Wrong!';
  } else {
    sfxRight.play();
    feedbackEl.textContent = 'Correct!';
  }

  // Move to next question
  currentQuestionIndex++;

  // Check if we've run out of questions or time
  if (currentQuestionIndex === questions.length || time <= 0) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Stop timer
  clearInterval(timerId);

  // Show end screen
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  // Show final score
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;

  // Hide questions section
  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
  // Update time
  time--;
  timerEl.textContent = time;

  // Check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Get value of input box
  var initials = initialsEl.value.trim();

  // Make sure value wasn't empty
  if (initials !== '') {
    // Get saved scores from local storage, or if not any, set to an empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    // Format new score object for the current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // Save to local storage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // Redirect to the next page
    window.location.href = 'highscores.html';
  }
}

// User clicks button to submit initials
submitBtn.onclick = saveHighscore;

// User clicks button to start quiz
startBtn.onclick = startQuiz;
