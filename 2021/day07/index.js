const { getInput } = require("../../utils");
const input = getInput().split(",").map(Number);

const constantRateFuelCalculator = (steps) => steps;
const quadraticRateFuelCalculator = (steps) => (Math.pow(steps, 2) + steps) / 2;

const calculateFuelForAlignmentTo = (position, fuelRateCalculator) => {
  return input.reduce((sum, crabPosition) => {
    const steps = Math.abs(position - crabPosition);
    return sum + fuelRateCalculator(steps);
  }, 0);
};

const calculateCheapestAlignmentPosition = (fuelRateCalculator) => {
  const minPos = Math.min(...input);
  const maxPos = Math.max(...input);

  let minFuel = Infinity;
  for (let i = minPos; i <= maxPos; i++) {
    minFuel = Math.min(minFuel, calculateFuelForAlignmentTo(i, fuelRateCalculator));
  }

  return minFuel;
};

const part1 = () => {
  return calculateCheapestAlignmentPosition(constantRateFuelCalculator);
};

const part2 = () => {
  return calculateCheapestAlignmentPosition(quadraticRateFuelCalculator);
};

console.log("#1:", part1()); // 359648
console.log("#2:", part2()); // 100727924
