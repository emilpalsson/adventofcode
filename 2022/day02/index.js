const { getInput, sum } = require("../../utils");
const input = getInput(true);

const OutcomeScore = {
  Win: 6,
  Draw: 3,
  Loss: 0,
};
const ShapeScore = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const part1 = () => {
  const ScoreMap = {
    "A X": OutcomeScore.Draw + ShapeScore.Rock,
    "A Y": OutcomeScore.Win + ShapeScore.Paper,
    "A Z": OutcomeScore.Loss + ShapeScore.Scissors,
    "B X": OutcomeScore.Loss + ShapeScore.Rock,
    "B Y": OutcomeScore.Draw + ShapeScore.Paper,
    "B Z": OutcomeScore.Win + ShapeScore.Scissors,
    "C X": OutcomeScore.Win + ShapeScore.Rock,
    "C Y": OutcomeScore.Loss + ShapeScore.Paper,
    "C Z": OutcomeScore.Draw + ShapeScore.Scissors,
  };

  return sum(input.map((x) => ScoreMap[x]));
};

const part2 = () => {
  const ScoreMap = {
    "A X": OutcomeScore.Loss + ShapeScore.Scissors,
    "A Y": OutcomeScore.Draw + ShapeScore.Rock,
    "A Z": OutcomeScore.Win + ShapeScore.Paper,
    "B X": OutcomeScore.Loss + ShapeScore.Rock,
    "B Y": OutcomeScore.Draw + ShapeScore.Paper,
    "B Z": OutcomeScore.Win + ShapeScore.Scissors,
    "C X": OutcomeScore.Loss + ShapeScore.Paper,
    "C Y": OutcomeScore.Draw + ShapeScore.Scissors,
    "C Z": OutcomeScore.Win + ShapeScore.Rock,
  };

  return sum(input.map((x) => ScoreMap[x]));
};

console.log("#1:", part1()); // 8933
console.log("#2:", part2()); // 11998
