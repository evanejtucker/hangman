$(document).ready(function() {

// Global Variables
// ---------------------------------------------------------------------------------
document.getElementById('main').disabled  = false;

document.getElementById('answerInfo').disabled  = false;


var spaceChar = "<span class='space'></span>";
var wordOptions = [];
var usedOptions = [];
var selectedCharacter ="";
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

	if(selectedCategory === "Marvel") {
		$("body").addClass("heroes");
		for (i=0; i<Heroes.length; i++) {
			wordOptions.push(Heroes[i]);
		}
	}

	if(selectedCategory === "DC") {
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

	if(selectedCategory === "Disney") {
		$("body").addClass("heroes");
		for (i=0; i<Heroes.length; i++) {
			wordOptions.push(Heroes[i]);
		}
	}

	if(selectedCategory === "Harry Potter") {
		$("body").addClass("heroes");
		for (i=0; i<Heroes.length; i++) {
			wordOptions.push(Heroes[i]);
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

	selectedCharacter = wordOptions.splice(Math.floor(Math.random() * wordOptions.length), 1)[0];
	usedOptions.push(selectedCharacter);


}

function startGame() {
	setSelectedWord();
	lettersInWord = selectedCharacter.name.split("");
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
	console.log(selectedCharacter);

}

function checkLetter(letter) {

	// check if letter exists in word
	var isLetterInWord = false;

	for (i=0; i<numBlanks; i++) {
		if(selectedCharacter.name[i].toUpperCase() == letter.toUpperCase()) {
			isLetterInWord = true;
		}
	}

	// check where in the word the letter exists, then add it to blanks and succceses
	if(isLetterInWord) {
		for(i=0; i<numBlanks; i++) {
			if(selectedCharacter.name[i].toLowerCase() == letter) {
				blanksAndSuccesses[i] = selectedCharacter.name[i];
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

		displayInfo();
		startGame();

	}

	// check if user lost
	else if (guessesRemaining===0) {
		lives--;
		$("#lives").html(lives);

		startGame();
	}

}

function displayInfo() {
	$("#nameTag").html(selectedCharacter.name);
	console.log(selectedCharacter);
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


});