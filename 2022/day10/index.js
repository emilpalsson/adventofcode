const { getInput } = require("../../utils");
const input = getInput(true);

const part1 = () => {
  let answer = 0;
  let register = 1;
  let cycle = 1;

  const tick = () => {
    cycle++;
    if (cycle % 40 === 20) {
      answer += cycle * register;
    }
  };

  input.forEach((instruction) => {
    if (instruction === "noop") {
      tick();
    } else if (instruction.startsWith("addx ")) {
      tick();
      register += Number(instruction.slice(5));
      tick();
    }
  });

  return answer;
};

const part2 = () => {};

console.log("#1:", part1()); // 17020
// console.log("#2:", part2());
