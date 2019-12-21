const { getInput } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput()
  .split(",")
  .map(Number);

const part1 = () => {
  let outputLine = "";

  let inputCommandPointer = 0;
  const inputCommand = [
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

  const onInput = () => {
    return inputCommand.charCodeAt(inputCommandPointer++);
  };

  const onOutput = output => {
    if (output === 10) {
      console.log(outputLine);
      outputLine = "";
    } else {
      if (output > 255) {
        console.log(output);
      } else {
        outputLine += String.fromCharCode(output);
      }
    }
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
};

const part2 = () => {
  let outputLine = "";

  let inputCommandPointer = 0;
  const inputCommand = [
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

  const onInput = () => {
    return inputCommand.charCodeAt(inputCommandPointer++);
  };

  const onOutput = output => {
    if (output === 10) {
      console.log(outputLine);
      outputLine = "";
    } else {
      if (output > 255) {
        console.log(output);
      } else {
        outputLine += String.fromCharCode(output);
      }
    }
  };

  const computer = intcodeComputer({ program: input, onInput, onOutput });
  computer.run();
};

// part1();
part2();

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
