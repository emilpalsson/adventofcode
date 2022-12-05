const { getInput } = require("../../utils");
const input = getInput();

const parseInput = () => {
  const [cratesInput, stepsInput] = input
    .replaceAll("\r", "")
    .split("\n\n")
    .map((x) => x.split("\n"));

  const stackCount = cratesInput.pop().replaceAll(" ", "").length;
  const stacks = [];

  for (let i = 0; i < stackCount; i++) {
    stacks[i] = [];
    const crateIdIndex = 4 * i + 1;
    cratesInput.forEach((line) => {
      const crateId = line.substring(crateIdIndex, crateIdIndex + 1).replace(" ", "");
      if (crateId) {
        stacks[i].push(crateId);
      }
    });
  }

  const steps = stepsInput.map((line) => {
    const [amountToMove, from, to] = line.split(" ").map(Number).filter(Boolean);
    return { amountToMove, from: from - 1, to: to - 1 };
  });

  return { stacks, steps };
};

const part1 = () => {
  const { stacks, steps } = parseInput();

  steps.forEach((step) => {
    for (let i = 0; i < step.amountToMove; i++) {
      const topContainer = stacks[step.from].shift();
      stacks[step.to].unshift(topContainer);
    }
  });

  return stacks.map((stack) => stack.shift()).join("");
};

const part2 = () => {
  const { stacks, steps } = parseInput();

  steps.forEach((step) => {
    const topContainers = stacks[step.from].splice(0, step.amountToMove);
    stacks[step.to].unshift(...topContainers);
  });

  return stacks.map((stack) => stack.shift()).join("");
};

console.log("#1:", part1()); // VGBBJCRMN
console.log("#2:", part2()); // LBBVJBRMH
