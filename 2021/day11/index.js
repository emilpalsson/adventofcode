const { getInput } = require("../../utils");
const input = getInput(true).map((line, y) =>
  line.split("").map((energy, x) => ({ x, y, energy: Number(energy) }))
);

let tickFlashCount = 0;
let flashCount = 0;

const getNeighbors = ({ x, y }) =>
  [
    input[y - 1]?.[x - 1],
    input[y - 1]?.[x],
    input[y - 1]?.[x + 1],
    input[y]?.[x - 1],
    input[y]?.[x + 1],
    input[y + 1]?.[x - 1],
    input[y + 1]?.[x],
    input[y + 1]?.[x + 1],
  ].filter(Boolean);

const flash = (octopus) => {
  flashCount++;
  tickFlashCount++;
  octopus.flashed = true;
  octopus.energy = 0;
  getNeighbors(octopus).forEach((neighbor) => {
    if (!neighbor.flashed) {
      neighbor.energy++;
      if (neighbor.energy > 9) {
        flash(neighbor);
      }
    }
  });
};

const print = () =>
  console.log(input.map((row) => row.map((octopus) => octopus.energy).join("")).join("\n"));

const tick = () => {
  tickFlashCount = 0;

  input.forEach((row) => {
    row.forEach((octopus) => {
      octopus.energy++;
    });
  });

  input.forEach((row) => {
    row.forEach((octopus) => {
      if (octopus.energy > 9) {
        flash(octopus);
      }
    });
  });

  input.forEach((row) => {
    row.forEach((octopus) => {
      if (octopus.flashed) {
        octopus.flashed = false;
      }
    });
  });
};

for (let i = 0; i < 10000; i++) {
  tick();

  if (i === 99) {
    console.log("Part 1:", flashCount);
  }

  if (tickFlashCount === 100) {
    console.log("Part 2:", i + 1);
    break;
  }
}

const part1 = () => {};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 0
// console.log("#2:", part2()); // 0
