const { getInput } = require("../../utils");
const input = getInput(true);

const run = () => {
  let aggregatedSignalStrength = 0;
  let register = 1;
  let cycle = 0;

  let crtScreen = "";
  let crtLine = "";

  const tick = () => {
    const crtPos = cycle % 40;
    crtLine += crtPos >= register - 1 && crtPos <= register + 1 ? "#" : " ";

    if (crtPos === 39) {
      crtScreen += "\n" + crtLine;
      crtLine = "";
    }

    cycle++;

    if (cycle % 40 === 20) {
      aggregatedSignalStrength += cycle * register;
    }
  };

  input.forEach((instruction) => {
    if (instruction === "noop") {
      tick();
    } else if (instruction.startsWith("addx ")) {
      tick();
      tick();
      register += Number(instruction.slice(5));
    }
  });

  return { part1: aggregatedSignalStrength, part2: crtScreen };
};

const result = run();

console.log("#1:", result.part1); // 17020
console.log("#2:", result.part2); // RLEZFLGE
