const { getInput, sum } = require("../../utils");
const input = getInput(true).map(x => parseInt(x));

const calcFuel = mass => Math.max(Math.floor(mass / 3) - 2, 0);

const calcTotalFuel = mass => {
  let total = 0;
  while (mass > 0) {
    mass = calcFuel(mass);
    total += mass;
  }
  return total;
};

const part1 = () => sum(input.map(calcFuel));
const part2 = () => sum(input.map(calcTotalFuel));

console.log("#1:", part1()); // 3362507
console.log("#2:", part2()); // 5040874
