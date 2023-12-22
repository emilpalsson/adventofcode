const { getInput } = require("../../utils");

const parseInput = () => {
  const input = getInput(true);
  const instructions = input.shift().split("");
  input.shift();

  const turnMap = new Map();
  input.map((row) => {
    const key = row.substring(0, 3);
    const leftTarget = row.substring(7, 10);
    const rightTarget = row.substring(12, 15);
    turnMap.set(key, { L: leftTarget, R: rightTarget });
  });

  return { instructions, turnMap };
};
const { instructions, turnMap } = parseInput();

const part1 = () => {
  let position = "AAA";
  let instructionPointer = 0;

  let steps = 0;
  while (position !== "ZZZ") {
    const instruction = instructions[instructionPointer++];
    if (instructionPointer >= instructions.length) instructionPointer = 0;

    position = turnMap.get(position)[instruction];
    steps++;
  }

  return steps;
};

const part2 = () => {};

console.log("#1:", part1()); // 16343
// console.log("#2:", part2());
