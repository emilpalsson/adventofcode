const { getInput } = require("../../utils");
const input = getInput()
  .split(",")
  .map(Number);

const run = (noun, verb) => {
  const state = input.slice();
  state[1] = noun;
  state[2] = verb;
  let pos = 0;

  while (state[pos] < 3) {
    const operation = state[pos];
    const a = state[state[pos + 1]];
    const b = state[state[pos + 2]];
    const resultIndex = state[pos + 3];

    state[resultIndex] = operation === 1 ? a + b : a * b;

    pos += 4;
  }
  return state[0];
};

const part1 = () => run(12, 2);

const part2 = () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if (run(noun, verb) === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};

console.log("#1:", part1()); // 3562672
console.log("#2:", part2()); // 8250
