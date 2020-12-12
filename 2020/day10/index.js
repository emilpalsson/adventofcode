const { getInput } = require("../../utils");
const input = [
  0,
  ...getInput(true)
    .map((line) => Number(line))
    .sort((a, b) => a - b),
];

const part1 = () => {
  let oneCount = 0;
  let threeCount = 0;

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1] - input[i] === 1) oneCount++;
    else threeCount++;
  }

  threeCount++; // Last built-in adapter, always 3 jolts higher
  return oneCount * threeCount;
};

const part2 = () => {
  // Start on the second last adapter, the last and second last will only ever have a single route
  let index = input.length - 3;
  const routesPerAdapter = {
    [input.length - 2]: 1,
    [input.length - 1]: 1,
  };

  while (index >= 0) {
    // Summarize routes from all valid children (always the next, sometimes the 2nd and 3rd next)
    let possibleRoutes = routesPerAdapter[index + 1];
    if (input[index + 2] - input[index] <= 3) possibleRoutes += routesPerAdapter[index + 2];
    if (input[index + 3] - input[index] <= 3) possibleRoutes += routesPerAdapter[index + 3];

    routesPerAdapter[index] = possibleRoutes;
    index--;
  }
  return routesPerAdapter[0];
};

console.log("#1:", part1()); // 2590
console.log("#2:", part2()); // 226775649501184
