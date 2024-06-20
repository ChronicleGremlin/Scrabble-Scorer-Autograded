// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

let scrabbleScorerType = "";
let scrabbleWord = "";

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

let newPointStructure = {};

const simplePointStructure = {
   1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

const vowelBonusStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U', 'Y']
};

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
   scoringFunction: scrabbleScorer,
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += Number(pointValue);
         }
      }
   }
   return letterPoints;
}

function scrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {

      for (const pointValue in newPointStructure) {

         if (newPointStructure[pointValue].includes(word[i])) {
            letterPoints += Number(pointValue);
         }
      }
   }
   return letterPoints;
}

function simpleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in simplePointStructure) {

         if (simplePointStructure[pointValue].includes(word[i])) {
            letterPoints += Number(pointValue);
         }

      }
   }
   return letterPoints;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in vowelBonusStructure) {

         if (vowelBonusStructure[pointValue].includes(word[i])) {
            letterPoints += Number(pointValue);
         }
      }
   }
   return letterPoints;
}

function initialPrompt() {
   console.log(`Let's play some scrabble!`);
   scrabbleWord = input.question('Enter a word:');

   return scrabbleWord;
};

const scoringAlgorithms = [scrabbleScore, simpleScore, bounsScore];

function scorerPrompt() {
   console.log(`0- ${scrabbleScore.name} (${scrabbleScore.description})\n1- ${simpleScore.name} (${simpleScore.description})\n2- ${bounsScore.name} (${bounsScore.description})`);
   scrabbleScorerType = input.question('Please enter 0, 1, or 2:');

   return scrabbleScorerType;
};


function transform(oldStructure) {
   let newStructure = {};
   for (const key in oldStructure) {
      for (let j = 0; j < oldStructure[key].length; j++) {
         newStructure[oldStructure[key][j].toLowerCase()] = key;
      }
   }
   return newStructure;
};


function runProgram() {
   newPointStructure = transform(oldPointStructure);
   initialPrompt();
   console.log('Which scoring algorithm would you like to use?');
   scorerPrompt();
   if (scrabbleScorerType == 0) {
      console.log(`Score for ${scrabbleWord} ${oldScrabbleScorer(scrabbleWord)}`);
   }
   if (scrabbleScorerType == 1) {
      console.log(`Score for ${scrabbleWord} ${simpleScorer(scrabbleWord)}`);
   }
   if (scrabbleScorerType == 2) {
      console.log(`Score for ${scrabbleWord} ${vowelBonusScorer(scrabbleWord)}`);
   }
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
