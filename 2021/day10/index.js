const { getInput } = require("../../utils");
const input = getInput(true).map((line) => line.split(""));

const isOpener = (char) => ["(", "[", "{", "<"].includes(char);

const closerToOpenerMap = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const closerToSyntaxScoreMap = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const openerToAutocompleteScoreMap = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const part1 = () => {
  const getSyntaxErrorScore = (line) => {
    const openers = [];
    for (char of line) {
      if (isOpener(char)) {
        openers.push(char);
      } else {
        const lastOpener = openers.pop();
        if (lastOpener !== closerToOpenerMap[char]) {
          return closerToSyntaxScoreMap[char];
        }
      }
    }
    return 0;
  };

  return input.map(getSyntaxErrorScore).reduce((sum, curr) => sum + curr, 0);
};

const part2 = () => {
  const getAutocompleteScore = (line) => {
    const openers = [];
    for (char of line) {
      if (isOpener(char)) {
        openers.push(char);
      } else {
        const lastOpener = openers.pop();
        if (lastOpener !== closerToOpenerMap[char]) {
          return null;
        }
      }
    }
    return openers
      .map((opener) => openerToAutocompleteScoreMap[opener])
      .reverse()
      .reduce((sum, curr) => sum * 5 + curr, 0);
  };

  const autoCompleteScores = input
    .map(getAutocompleteScore)
    .filter(Boolean)
    .sort((a, b) => a - b);

  return autoCompleteScores[Math.floor(autoCompleteScores.length / 2)];
};

console.log("#1:", part1()); // 345441
console.log("#2:", part2()); // 3235371166
