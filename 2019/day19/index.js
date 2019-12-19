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
        requiredAxis = "y";
        return x;
      }
      requiredAxis = "x";
      return y;
    };

    const onOutput = output => {
      resolve(output === 1);
    };

    const computer = intcodeComputer({ program: input, onInput, onOutput });
    computer.run();
  });

const solve = async () => {
  let found;
  let y = 0;
  let lastX = 0;
  while (!found) {
    let beamFound = false;
    for (let x = lastX; x < 1000000000; x++) {
      const tl = await checkPosition(x, y);
      if (tl) {
        if (!beamFound) {
          beamFound = true;
          lastX = x;
        }
        const tr = await checkPosition(x + 99, y);
        const bl = await checkPosition(x, y + 99);
        const br = await checkPosition(x + 99, y + 99);
        if (tr && bl && br) {
          found = { x, y };
          break;
        }
      } else if (beamFound) {
        break;
      }
    }

    // if (y % 100 === 0) {
    //   console.log(y);
    // }

    y++;
  }
  console.log(found.x * 10000 + found.y);
};

const answer = solve();
// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
