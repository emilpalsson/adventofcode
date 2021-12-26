const { getInput } = require("../../utils");
const input = getInput().replace(/\r\n/g, "\n");

const parseInput = () => {
  let [template, rules] = input.split("\n\n");
  rules = rules.split("\n").reduce((result, line) => {
    const [pair, element] = line.split(" -> ");
    result[pair] = element;
    return result;
  }, {});
  return { template, rules };
};

const tick = (state, rules) => {
  let nextState = "";
  for (let i = 0; i < state.length - 1; i++) {
    nextState += state[i];

    const pair = state[i] + state[i + 1];
    const toInsert = rules[pair];
    if (toInsert) {
      nextState += toInsert;
    }
  }
  nextState += state[state.length - 1];
  return nextState;
};

const countElements = (state) => {
  const result = {};
  for (let i = 0; i < state.length; i++) {
    result[state[i]] = (result[state[i]] || 0) + 1;
  }
  return result;
};

const part1 = () => {
  let { template: state, rules } = parseInput();

  for (let i = 0; i < 10; i++) {
    state = tick(state, rules);
  }

  const elementQuantitiesSorted = Object.values(countElements(state)).sort((a, b) => a - b);
  const mostCommonQuantity = elementQuantitiesSorted[elementQuantitiesSorted.length - 1];
  const leastCommonQuantity = elementQuantitiesSorted[0];

  return mostCommonQuantity - leastCommonQuantity;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 2321
// console.log("#2:", part2()); // 0
