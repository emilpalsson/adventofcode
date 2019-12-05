const { getInput } = require("../../utils");
const input = getInput()
  .split(",")
  .map(Number);

const run = () => {
  const state = input.slice();
  let pos = 0;

  while (state[pos] !== 99) {
    const opStr = state[pos].toString().padStart(5, "0");

    const operation = Number(opStr.substr(opStr.length - 2));
    const positionModes = opStr
      .substr(0, opStr.length - 2)
      .split("")
      .map(Number);

    if (operation === 1) {
      const a = positionModes[2] === 1 ? state[pos + 1] : state[state[pos + 1]];
      const b = positionModes[1] === 1 ? state[pos + 2] : state[state[pos + 2]];
      const resultIndex = state[pos + 3];

      state[resultIndex] = a + b;

      pos += 4;
    } else if (operation === 2) {
      const a = positionModes[2] === 1 ? state[pos + 1] : state[state[pos + 1]];
      const b = positionModes[1] === 1 ? state[pos + 2] : state[state[pos + 2]];
      const resultIndex = state[pos + 3];

      state[resultIndex] = a * b;

      pos += 4;
    } else if (operation === 3) {
      const a = state[pos + 1];
      state[a] = 1;
      pos += 2;
    } else if (operation === 4) {
      const a = positionModes[2] === 1 ? state[pos + 1] : state[state[pos + 1]];
      console.log(a); // 7265618
      pos += 2;
    }
  }
  return state[0];
};

run();

// console.log("#1:", part1()); // 3562672
// console.log("#2:", part2()); // 8250
