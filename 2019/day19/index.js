const { getInput } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput()
  .split(",")
  .map(Number);

const checkPosition = (x, y) =>
  new Promise(resolve => {
    let requiredAxis = 0;

    const onInput = () => {
      if (requiredAxis === 0) {
        // console.log("input x", x);
        requiredAxis = "y";
        return x;
      }
      // console.log("input y", y);
      requiredAxis = "x";
      return y;
    };

    const onOutput = output => {
      console.log(x, "x", y, "=", output);
      resolve(output);
    };

    const computer = intcodeComputer({ program: input, onInput, onOutput });
    computer.run();
  });

const solve = async () => {
  const map = {};
  const position = { x: 0, y: 0 };
  let requiredAxis = 0;
  const getId = (x = position.x, y = position.y) => `${x},${y}`;

  let sum = 0;

  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      const apa = await checkPosition(x, y);
      sum += apa;
    }
  }

  sum;
};

const answer = solve();
// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
