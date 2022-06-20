//create global variables
const guessedLettersElement = document.querySelector(".guessed-letters");  //unordered list
const guessLetterButton = document.querySelector(".guess");  //button with the text Guess in it
const letterInput = document.querySelector(".letter");  //text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");  //empty paragraph where the word in progress appears
const remainingGuessesElement = document.querySelector(".remaining");  // paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span"); // span inside the paragraph where the remaining guesses display
const message = document.querySelector(".message");   //empty paragraph where remaining guesses display
const playAgainButton = document.querySelector(".play-again"); //hidden button that will appear promptig to play again 

let word = "magnolia";  //changed const to let because it's value will change over time
//this array contains all the letters the player guesses
const guessedLetters = [];
let remainingGuesses = 8;
//create a function to count guesses remaining
const getWord = async function () {
  const response = await
  fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  //newlines: delimiter \n is a character to separate words
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};
// fire off the game
getWord();


//write a function to add placeholders for each letter; the symbols
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      //console.log(letter);
      //change the emoji
      placeholderLetters.push("☀️");
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join ("");
};
//call the function
//placeholder(word);

//add an event listener
guessLetterButton.addEventListener("click", function (e) {
    //prevents reloading 
    e.preventDefault();
    //empty the text of the message element - after doing the check input below
    message.innerText = "";
    //capture the value of the input
    const guess = letterInput.value;
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
  //call your new function and pass guessedLettters as an argument
  console.log(guessedLetters);
  //new list item for each letter in the guessedLetters array
  updateGuessesRemaining(guess);  //letter displayes when it hasn't before
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

//create a function to update the page with the letters the player guesses
const showGuessedLetters = function () {
  //empty the innerHTML unordered list where the guessed letters will display-- clear the list
  guessedLettersElement.innerHTML = "";
  //create a new list item for each letter inside the guessedLetters array
    for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      guessedLettersElement.append(li);
    }
};

//create a function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
  //change the word variable to uppercase
  const wordUpper =  word.toUpperCase();
  //split the word string into an array so the letter can appear in the guessed letters array
  const wordArray = wordUpper.split("");
//check if the word array contains any letters from the guessedLetters array
  const revealWord = [];
  for (const letter of wordArray) {
  if (guessedLetters.includes(letter)) {
    revealWord.push(letter.toUpperCase());
    } else {
    //update the circle symbol with the correct letter
      revealWord.push("☀️");
      revealWord.push("●");
    }
  }
  //console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};
  const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
      //wrong guess
      message.innerText = `Sorry, there is no ${guess}.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Good guess! The the word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
      message.innerHTML = `Game Over! The word was <span class="highlight">${word}</span>.`;
        } else if (remainingGuesses === 1) {
          remainingGuessesSpan.innerText = `$(remainingGuesses} guess`;
        } else {
          remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
        }
  };

  const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
  };
  




