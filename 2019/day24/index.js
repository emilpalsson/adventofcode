const { getInput } = require("../../utils");
const input = getInput(true)
  .map(x => x.split(""))
  .flat()
  .map(x => x === "#");

const getBitwiseValue = arr =>
  arr.reduce((aggr, value, index) => {
    aggr |= value << index;
    return aggr;
  }, 0);

const bitIsSet = (num, bit) => (num >> bit) % 2 != 0;

const part1 = () => {
  const countAdjacentBugs = tile => {
    let adjacentBugs = 0;
    if (tile >= 5 && bitIsSet(state, tile - 5)) {
      adjacentBugs++;
    }
    if (tile % 5 !== 0 && bitIsSet(state, tile - 1)) {
      adjacentBugs++;
    }
    if (tile % 5 !== 4 && bitIsSet(state, tile + 1)) {
      adjacentBugs++;
    }
    if (tile <= 19 && bitIsSet(state, tile + 5)) {
      adjacentBugs++;
    }
    return adjacentBugs;
  };

  const tick = () => {
    let nextState = 0;
    for (let i = 0; i < 25; i++) {
      const infested = bitIsSet(state, i);
      const adjacentBugs = countAdjacentBugs(i);
      let willBeInfested = infested;

      if (infested && adjacentBugs !== 1) {
        willBeInfested = false;
      } else if (!infested && (adjacentBugs === 1 || adjacentBugs === 2)) {
        willBeInfested = true;
      }

      if (willBeInfested) {
        nextState |= 1 << i;
      }
    }
    state = nextState;
  };

  let state = getBitwiseValue(input);
  const seenStates = new Set();

  while (true) {
    if (seenStates.has(state)) {
      return state;
    }
    seenStates.add(state);
    tick();
  }
};

console.log("#1:", part1()); // 32526865
// console.log("#2:", getHullDamage(part2Input)); // 1143356492
