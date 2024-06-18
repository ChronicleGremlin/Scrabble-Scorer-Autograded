// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

const simplePointStructure = {
   1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

const vowelBonusStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U', 'Y']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let scrabbleWord = "";

function initialPrompt() {
   console.log(`Let's play some scrabble!`);
   scrabbleWord = input.question('Enter a word:');

   return scrabbleWord;
};

let newPointStructure;

function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in simplePointStructure) {

         if (simplePointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in vowelBonusStructure) {

         if (vowelBonusStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

let scrabbleScorer;

let bounsScore = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: vowelBonusScorer,
};

let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scoringFunction: simpleScorer,
};

let scrabbleScore = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: oldScrabbleScorer,
};

const scoringAlgorithms = [scrabbleScore, simpleScore, bounsScore];


function scorerPrompt() {
   console.log('Which scoring algorithm would you like to use?');
   console.log(`0- ${scrabbleScore.name} (${scrabbleScore.description})\n1- ${simpleScore.name} (${simpleScore.description})\n2- ${bounsScore.name} (${bounsScore.description})`);
   let scoreMode = input.question('Please enter 0, 1, or 2:');

   return scoreMode;

};


function transform() { };

function runProgram() {
   initialPrompt();
   scorerPrompt();
   console.log(scorerPrompt(scrabbleWord));

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
