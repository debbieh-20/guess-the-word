//create global variables
const guessedLettersElement = document.querySelector(".guessed-letters");  //unordered list
const buttonLetterGuess = document.querySelector(".guess");  //button with the text Guess in it
const letterInput = document.querySelector(".letter");  //text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress");  //empty paragraph where the word in progress appears
const remainingGuessesElement = document.querySelector(".remaining");  // paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span"); // span inside the paragraph where the remaining guesses display
const message = document.querySelector(".message");   //empty paragraph where remaining guesses display
const playAgainButton = document.querySelector(".play-again"); //hidden button that will appear promptig to play again 

const word = "magnolia";

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
buttonLetterGuess.addEventListener("click", function (e) {
    //prevents reloading behavior
    e.preventDefault();
    //capture the value of the input
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});

