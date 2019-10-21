var charList = ["venom", "punisher", "deadpool", "spiderman", "wolverine", "blade", "lockjaw"];

var word = "";
// This will break the solution into individual letters to be stored in array.
var correctLetters = [];
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var alsoLetters = [];
// Holds all of the wrong guesses
var wrongLetters = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 10;

function startGame() {
  // Reset the guesses back to 0.
  numGuesses = 10;

  // Solution is chosen randomly from wordList.
  word = charList[Math.floor(Math.random() * charList.length)];
  // The word is broken into individual letters.
  correctLetters = word.split("");
  // We count the number of letters in the word.
  numBlanks = correctLetters.length;

  alsoLetters = [];
  wrongLetters = [];

  for (var i = 0; i < numBlanks; i++) {
    alsoLetters.push("_");
  }

  // Reprints the guessesLeft to 9
  document.getElementById("Left").innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = alsoLetters.join(" ");

  // Clears the wrong guesses from the previous round
  document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");
}

// checkLetters() function
// It's where we will do all of the comparisons for matches.
// Again, it's not being called here. It's just being made for future use.
function checkLetters(letter) {

  // This boolean will be toggled based on whether or not a user letter is found anywhere in the word.
  var letterInWord = false;

  // Check if a letter exists inside the array at all.
  for (var i = 0; i < numBlanks; i++) {
    if (word[i] === letter) {
      // If the letter exists then toggle this boolean to true. This will be used in the next step.
      letterInWord = true;
    }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices).
  if (letterInWord) {

    // Loop through the word.
    for (var j = 0; j < numBlanks; j++) {

      // Populate the blanksAndSuccesses with every instance of the letter.
      if (word[j] === letter) {
        // Here we set the specific space in blanks and letter equal to the letter when there is a match.
        alsoLetters[j] = letter;
      }
    }
    // Logging for testing.
    console.log(alsoLetters);
  }
  // If the letter doesn't exist at all...
  else {
    // ..then we add the letter to the list of wrong letters, and we subtract one of the guesses.
    wrongLetters.push(letter);
    numGuesses--;
  }
}

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {

  // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

  // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
  document.getElementById("guesses-left").innerHTML = numGuesses;
  // This will print the array of guesses and blanks onto the page.
  document.getElementById("word-blanks").innerHTML = alsoLetters.join(" ");
  // This will print the wrong guesses onto the page.
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

  // If we have gotten all the letters to match the solution...
  if (correctLetters.toString() === alsoLetters.toString()) {
    // ..add to the win counter & give the user an alert.
    winCounter++;
    alert("You win!");

    // Update the win counter in the HTML & restart the game.
    document.getElementById("win-counter").innerHTML = winCounter;
    startGame();
  }

  // If we've run out of guesses..
  else if (numGuesses === 0) {
    // Add to the loss counter.
    lossCounter++;
    // Give the user an alert.
    alert("You lose");

    // Update the loss counter in the HTML.
    document.getElementById("loss-counter").innerHTML = lossCounter;
    // Restart the game.
    startGame();
  }

}

// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================

// Starts the Game by running the startGame() function
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function (event) {
  // Check if the key pressed is a letter.
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters.
    var letterGuessed = event.key.toLowerCase();
    // Runs the code to check for correctness.
    checkLetters(letterGuessed);
    // Runs the code after each round is done.
    roundComplete();
  }
};