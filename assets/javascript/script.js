$(document).ready(function() {

// Global Variables
// ---------------------------------------------------------------------------------

var AnswerInfo = require("./answerInfo.js");

var spaceChar = "<span class='space'></span>";
var wordOptions = [];
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

	if(selectedCategory === "Heroes") {
		$("body").addClass("heroes");
		var heroes = ["Green Arrow", "Wonder Woman", "Batman", "Superman", "Captain America", "Shazam", "Aquaman"];
		for (i=0; i<heroes.length; i++) {
			wordOptions.push(heroes[i]);
		}
	}

	if(selectedCategory === "Villains") {
		$("body").addClass("villain");
		var villains = ["Captain Cold", "Bane"];
		for (i=0; i<villains.length; i++) {
			wordOptions.push(villains[i]);
		}
	}

	if(selectedCategory === "Planets") {
		$("body").addClass("planets");
		var planets = ["Earth", "Jupiter", "Mars", "Venus", "Neptune", "Mercury", "Saturn", "Uranus"];
		for (i=0; i<planets.length; i++) {
			wordOptions.push(planets[i]);
		}
	}

	if(selectedCategory === "Countries") {
		$("body").addClass("countries");
		var countries = ["Canada", "Spain"];
		for (i=0; i<countries.length; i++) {
			wordOptions.push(countries[i]);
		}
	}

	// Initializes the game once a category has been selected
	startGame();
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

}

function roundComplete() {
	console.log("Wins: " + wins + " | Lives " + lives + " | Guesses Remaining " + guessesRemaining);

	// update html with current game conditions
	$("#wordToGuess").html(blanksAndSuccesses.join(" "));
	$("#wrongGuesses").html(wrongGuesses.join(" "));
	$("#guessesRemaining").html(guessesRemaining);

	var onlyLetters = blanksAndSuccesses.map(removeSpaces);

	// check if user won
	if (lettersInWord.toString() === onlyLetters.toString()) {
		wins++;
		$("#wins").html(wins);

		startGame();

	}

	// check if user lost
	else if (guessesRemaining===0) {
		lives--;
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


// registers key clicks
document.onkeyup = function(event) {
	if (event.keyCode >= 65 && event.keyCode <= 90) {
		var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
		checkLetter(letterGuessed);
		roundComplete();
	} 
}

var newAnswer = new Answers("Evan", "picture", "Sound", "description", "hint");
newAnswer.logInfo();


});