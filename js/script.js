//create global variables
const guessedLettersElement = document.querySelector(".guessed-letters");  //unordered list

const guessLetterButton = document.querySelector(".guess");  //button with the text Guess in it

const buttonLetterGuess = document.querySelector(".guess");  //button with the text Guess in it

const letterInput = document.querySelector(".letter");  //text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");  //empty paragraph where the word in progress appears
const remainingGuessesElement = document.querySelector(".remaining");  // paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span"); // span inside the paragraph where the remaining guesses display
const message = document.querySelector(".message");   //empty paragraph where remaining guesses display
const playAgainButton = document.querySelector(".play-again"); //hidden button that will appear promptig to play again 

const word = "magnolia";
//this array contains all the letters the player guesses
const guessedLetters = [];

//write a function to add placeholders for each letter; the circle symbol
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join ("");
};
//call the function
placeholder(word);

//add an event listener
guessLetterButton.addEventListener("click", function (e) {
    //prevents reloading 
    e.preventDefault();
    //empty the text of the message element - after doing the check input below
    message.innerText = "";
    //capture the value of the input
    const guess = letterInput.value;
    //console.log(guess);
    const goodGuess = validateInput(guess);
      if (goodGuess) {
        makeGuess(guess);
      }
    letterInput.value = "";
    //call the function that checks the input
});

//create a function to check player's input
const validateInput = function (input) {
//use a regular expression to ensure the input is a letter
  const acceptedLetter = /[a-zA-Z]/;
  //check if input is empty
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
  //check if they put more than one letter
    } else if (input.length >1) {
        message.innerText = "Please enter a single letter.";
    //did they enter an accepted letter - matches the regular expression above
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
      return input;
    }
};

const makeGuess = function (guess) {
  //converting the letter parameter to uppercase
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter. Try another please.";
  } else {
    guessedLetters.push(guess);
  console.log(guessedLetters);
  }
};

buttonLetterGuess.addEventListener("click", function (e) {
    //prevents reloading behavior
    e.preventDefault();
    //capture the value of the input
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});

