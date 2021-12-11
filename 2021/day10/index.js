const { getInput } = require("../../utils");
const input = getInput(true, false).map((line) => line.split(""));

const isOpener = (char) => ["(", "[", "{", "<"].includes(char);

const closerToOpenerMap = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const closerToScoreMap = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
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
          return closerToScoreMap[char];
        }
      }
    }
    return 0;
  };

  return input.map(getSyntaxErrorScore).reduce((sum, curr) => sum + curr, 0);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 345441
// console.log("#2:", part2()); // 0
