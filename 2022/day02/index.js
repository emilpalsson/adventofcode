const { getInput, sum } = require("../../utils");
const input = getInput(true).map((x) => x.split(" "));

const OponentShape = {
  Rock: "A",
  Paper: "B",
  Scissors: "C",
};

const YourShape = {
  Rock: "X",
  Paper: "Y",
  Scissors: "Z",
};

const ShapeScore = {
  [YourShape.Rock]: 1,
  [YourShape.Paper]: 2,
  [YourShape.Scissors]: 3,
};

const Outcome = {
  Win: 6,
  Draw: 3,
  Loss: 0,
};

const getOutcome = (oponentPlay, yourPlay) => {
  if (yourPlay === YourShape.Rock && oponentPlay === OponentShape.Rock) return Outcome.Draw;
  if (yourPlay === YourShape.Rock && oponentPlay === OponentShape.Paper) return Outcome.Loss;
  if (yourPlay === YourShape.Rock && oponentPlay === OponentShape.Scissors) return Outcome.Win;

  if (yourPlay === YourShape.Paper && oponentPlay === OponentShape.Rock) return Outcome.Win;
  if (yourPlay === YourShape.Paper && oponentPlay === OponentShape.Paper) return Outcome.Draw;
  if (yourPlay === YourShape.Paper && oponentPlay === OponentShape.Scissors) return Outcome.Loss;

  if (yourPlay === YourShape.Scissors && oponentPlay === OponentShape.Rock) return Outcome.Loss;
  if (yourPlay === YourShape.Scissors && oponentPlay === OponentShape.Paper) return Outcome.Win;
  if (yourPlay === YourShape.Scissors && oponentPlay === OponentShape.Scissors) return Outcome.Draw;
};

const part1 = () => {
  return sum(input.map(([oponent, you]) => getOutcome(oponent, you) + ShapeScore[you]));
};

const part2 = () => {
  return sum(input.slice(0, 3));
};

console.log("#1:", part1()); // 8933
// console.log("#2:", part2());
