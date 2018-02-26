var { getInput } = require("../utils");
const input = getInput(15, true)
  .map(row => /Disc #(\d+) has (\d+).*position (\d+)/.exec(row))
  .map(arr => ({ positions: parseInt(arr[2]), position: parseInt(arr[3]) }));

const findSolution = discs => {
  const testDelay = delay => {
    for (let i = 0; i < discs.length; i++) {
      if ((i + 1 + delay + discs[i].position) % discs[i].positions !== 0) {
        return false;
      }
    }
    return true;
  };

  let delay = 0;
  while (!testDelay(delay)) {
    delay++;
  }
  return delay;
};

console.log("#1:", findSolution(input));
console.log("#2:", findSolution([...input, { positions: 11, position: 0 }]));
