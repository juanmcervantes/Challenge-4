// Function to print high scores
function printHighscores() {
  // Either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // Sort highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i += 1) {
    // Create li tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    // Display on page
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

// Function to clear high scores
function clearHighscores() {
  // Remove high scores from localstorage
  window.localStorage.removeItem('highscores');
  // Reload the page to reflect the changes
  window.location.reload();
}

// Attach the clearHighscores function to the click event of the 'clear' button
document.getElementById('clear').addEventListener('click', clearHighscores);

// Run the printHighscores function when the page loads to display the high scores
printHighscores();
