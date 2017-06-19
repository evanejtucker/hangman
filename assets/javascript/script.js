$(document).ready(function() {

// Global Variables
// ---------------------------------------------------------------------------------

var spaceChar = "<span class='space'></span>";
var wordOptions = ["Green Arrow", "Wonder Woman", "Batman", "Superman", "Captain America", "Shazam", "Aquaman"];
var usedOptions = [];
var selectedWord ="";
var letterInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

// game counters
var wins = 0;
var lives = 4;
var guessesRemaining = 10;




// Functions
// ---------------------------------------------------------------------------------

var setCategory = function() {

	$(".container").addClass("gameContainer");

	if(selectedCategory === "Countries") {
		$("body").addClass("countries");
	}

	if(selectedCategory === "Heroes") {
		$("body").addClass("heroes");
		// heroes = [];
		// wordOptions.push(heroes);
	}
}

var removeSpaces = function (char) {
  if (char === spaceChar) {
    return " ";
  } else {
    return char;
  }
}

function setSelectedWord() {
	if (wordOptions.length === 0) {
    wordOptions = usedOptions;
    alert("all done");
  	}

	selectedWord = wordOptions.splice(Math.floor(Math.random() * wordOptions.length), 1)[0];
	usedOptions.push(selectedWord);
	console.log(usedOptions);

}

function startGame() {
	setSelectedWord();
	lettersInWord = selectedWord.split("");
	numBlanks = lettersInWord.length;

	// reset variables
	guessesRemaining = 10;
	wrongGuesses = [];
	blanksAndSuccesses = [];

	// populated userGuess with numBlanks
	for(i=0; i<numBlanks; i++) {

	    if (lettersInWord[i] === " ") {
	      blanksAndSuccesses.push(spaceChar);
	    } else {
	      blanksAndSuccesses.push("_");
	    }
	}

	// update html
	$("#wordToGuess").html(blanksAndSuccesses.join(" "));
	$("#guessesRemaining").html(guessesRemaining);
	$("#wins").html(wins);
	$("#lives").html(lives);

	// testing / debugging
	console.log(selectedWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetter(letter) {

	// check if letter exists in word
	var isLetterInWord = false;

	for (i=0; i<numBlanks; i++) {
		if(selectedWord[i].toUpperCase() == letter.toUpperCase()) {
			isLetterInWord = true;
		}
	}

	// check where in the word the letter exists, then add it to blanks and succceses
	if(isLetterInWord) {
		for(i=0; i<numBlanks; i++) {
			if(selectedWord[i].toLowerCase() == letter) {
				blanksAndSuccesses[i] = selectedWord[i];
			} 
		} 
	} 
	// letter wasnt found
	else {
		wrongGuesses.push(letter);
		guessesRemaining--;
	}

	// testing/ debugging
	console.log(blanksAndSuccesses);
}

function roundComplete() {
	console.log("Wins: " + wins + " | Lives " + lives + " | Guesses Remaining " + guessesRemaining);

	// update html with current game conditions
	$("#wordToGuess").html(blanksAndSuccesses.join(" "));
	$("#wrongGuesses").html(wrongGuesses.join(" "));
	$("#guessesRemaining").html(guessesRemaining);

	var onlyLetters = blanksAndSuccesses.map(removeSpaces);
  	console.log(onlyLetters);

	// check if user won
	if (lettersInWord.toString() === onlyLetters.toString()) {
		wins++;
		alert("you win");
		$("#wins").html(wins);

		startGame();

	}

	// check if user lost
	else if (guessesRemaining===0) {
		lives--;
		alert("you lost");
		$("#lives").html(lives);

		startGame();
	}

}




// Main Process
// ---------------------------------------------------------------------------------

// hides game screen
$("#game").hide();

// start screen, user selects category
$("#submit").on("click", function(event) {
	event.preventDefault();
	selectedCategory = $("#category").val();
	setCategory();
	$(".jumbotron").hide();
	$("#game").show();

});

// initializes the game
startGame();

// registers key clicks
document.onkeyup = function(event) {
	if (event.keyCode >= 65 && event.keyCode <= 90) {
		var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
		checkLetter(letterGuessed);
		roundComplete();
		
		// testing / debugging
		console.log(letterGuessed);
	} 
}


});