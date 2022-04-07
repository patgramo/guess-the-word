const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLettersButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress =  document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessedMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Display the Placeholder Symbols // 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//All events for clicking the button//
guessLettersButton.addEventListener ("click", function(e){
    e.preventDefault();
    //emptying the message paragraph//
    guessedMessage.innerText = "";
    //grab the value of what the person inputs//
    const guess = letterInput.value;
    //give a message if too long/wrong characters//
    const goodGuess = InputValidation(guess);
    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});

//checks the input for just 1 letter//
const InputValidation = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    //empty guess//
    if (input.length ===  0) {
        guessedMessage.innerText = "Your input was empty. Make sure to guess a letter.";
    }
    //more than one letter guess//
    else if (input.length > 1) {
        guessedMessage.innerText = "Only enter 1 letter at a time.";
    }
    //used a number or special character//
    else if (!input.match(acceptedLetter)) {
        guessedMessage.innerText = "Only enter single letters. No numbers or special characters.";
    }
    //did the right thing(1 letter)//
    else {
        return input;
    }
};

//Checks to see if a letter has already been guessed//
const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessedMessage.innerText = "You already guessed that letter silly.";
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};