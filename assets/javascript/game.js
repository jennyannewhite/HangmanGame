// define variables
var word = ["banana", "plum", "apricot", "peach", "pear", "passionfruit", "grape", "lemon"];
var chosenWord = ""; // word computer randomly selects
var letters = []; // letters that comprise chosenWord
var blanks = []; // underscores of current word
var wrongLetters = []; //incorrectly guessed letters
var number = 0; // length of chosenWord
var guessesLeft = 10; // how many "lives" player has left. starts at 10.
var losses = 0; // players losses
var wins = 0; // players wins

// start the game
function gameStart() {
    chosenWord = word[Math.floor(Math.random() * word.length)];
    letters = chosenWord.split("");
    number = letters.length;

    guessesLeft = 10;
    wrongLetters = [];
    blanks = [];

    for (var i = 0; i < number; i++) {
        blanks.push("_");
    }

    document.getElementById("currentword").innerHTML = "Current Word: " + blanks.join(" ");
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
    document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;
    document.getElementById("lettersGuessed").innerHTML = "Incorrect Letters Guessed: " + wrongLetters;
};

function checkAnswer(letter) {

    var letterInWord = false;
    var repeatedLetter = false;
    for (var j = 0; j < number; j++) {

        if (letter == chosenWord[j]) {
            letterInWord = true;
        }
    }

    for (var l = 0; l < wrongLetters.length; l++) {
        if (letter == wrongLetters[l]) {
            repeatedLetter = true
        }
    }

    if (letterInWord) {
        for (var k = 0; k < number; k++) {
            if (chosenWord[k] == letter) {
                blanks[k] = letter;
            }
        }
    } else if (repeatedLetter) {
        // is this allowed?
    } else {
        wrongLetters.push(letter);
        guessesLeft--;
    }

};

gameStart();

function rounds() {

    document.getElementById("guessesLeft").innerHTML = "Guesses Left: " + guessesLeft;
    document.getElementById("lettersGuessed").innerHTML = "Incorrect Letters Guessed: " + wrongLetters;
    document.getElementById("currentword").innerHTML = "Current Word: " + blanks.join(" ");

    if (letters.toString() == blanks.toString()) {
        wins++;
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        setTimeout(gameStart, 1500); // delay gameStart so word displays!
        //gameStart();
    } else if (guessesLeft === 0) {
        losses++;
        document.getElementById("losses").innerHTML = "Losses: " + losses;
        gameStart();
    }
};

//event listener
document.onkeypress = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    checkAnswer(userGuess);
    rounds();
};


}