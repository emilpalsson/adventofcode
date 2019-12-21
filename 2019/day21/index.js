const { getInput } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput()
  .split(",")
  .map(Number);

const part1Input = [
  "NOT A J",
  "NOT B T",
  "OR T J",
  "NOT C T",
  "OR T J",
  "NOT D T",
  "NOT T T",
  "AND T J",
  "WALK",
  ""
].join("\n");

const part2Input = [
  "NOT A J",
  "NOT B T",
  "OR T J",
  "NOT C T",
  "OR T J",
  "NOT D T",
  "NOT T T",
  "AND T J",
  "NOT I T",
  "NOT T T",
  "OR F T",
  "AND E T",
  "OR H T",
  "AND T J",
  "RUN",
  ""
].join("\n");

const getHullDamage = inputCommand => {
  let hullDamage;
  let inputCommandPointer = 0;

  const onInput = () => inputCommand.charCodeAt(inputCommandPointer++);

  const onOutput = output => {
    hullDamage = output;
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
  return hullDamage;
};

console.log("#1:", getHullDamage(part1Input)); // 19358870
console.log("#2:", getHullDamage(part2Input)); // 1143356492
