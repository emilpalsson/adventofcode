const { getInput } = require("../../utils");
const input = getInput(true).map((line, y) =>
  line.split("").map((energy, x) => ({ x, y, energy: Number(energy) }))
);

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

for (let i = 0; i < 100; i++) {
  tick();
}
// print();
console.log(flashCount);

const part1 = () => {};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 0
// console.log("#2:", part2()); // 0
