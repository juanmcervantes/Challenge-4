// Variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
// ... other elements ...

// Function to start the quiz
function startQuiz() {
  // hide start screen, un-hide questions section, start timer, and get first question
  // ...
}

// Function to get the current question
function getQuestion() {
  // get current question object from array, update title with current question, clear out any old question choices, loop over choices
  // ...
}

// Function to handle the answer click
function questionClick() {
  // check if user guessed wrong and penalize time, display new time on page, play "wrong" sound effect, flash right/wrong feedback on page for half a second, move to next question
  // ...
}

// Function to end the quiz
function quizEnd() {
  // stop timer, show end screen, show final score, hide questions section
  // ...
}

// Function to save the highscore
function saveHighscore() {
  // get value of input box, make sure value wasn't empty, get saved scores from localstorage, or if not any, set to empty array, format new score object for current user, save to localstorage, redirect to next page
  // ...
}

// user clicks button to submit initials, start quiz, on answer click, on typing initials
// ...
