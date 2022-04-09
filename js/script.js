const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLettersButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress =  document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessedMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    console.log(data);
    const wordArray = data.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

//The start of the game//
getWord();

// Display the Placeholder Symbols // 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWord(guessedLetters);
    }
};

const showGuessedLetters = function(){
    //clear the list//
    guessedLettersElement.innerHTML = "";
    //Add guessed letter to list//
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWord = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

// Display how many guesses remain//
const updateGuessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        guessedMessage.innerText = `There are no ${guess}'s in the word.`;
        remainingGuesses -= 1;
    }
    else {
        guessedMessage.innerText = "Good guess!"
    }

    if (remainingGuesses === 0) {
        guessedMessage.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//add a message if they win//
const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
      guessedMessage.classList.add("win");
      guessedMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

      //when you win, make the start over button appear//
      startOver();
    }
  };

  //restart the game//
  const startOver = function() {
      guessLettersButton.classList.add("hide");
      remainingGuessesElement.classList.add("hide");
      guessedLettersElement.classList.add("hide");
      playAgainButton.classList.remove("hide");
  };

  playAgainButton.addEventListener("click", function() {
      //reset to original//
      guessedMessage.classList.remove("win");
      guessedLetters = [];
      remainingGuesses = 8;
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
      guessedLettersElement.innerHTML = "";
      guessedMessage.innerText = "";
      
      getWord();

      //display the original elements//
      guessLettersButton.classList.remove("hide");
      playAgainButton.classList.add("hide");
      remainingGuessesElement.classList.remove("hide");
      guessedLettersElement.classList.remove("hide");
  });