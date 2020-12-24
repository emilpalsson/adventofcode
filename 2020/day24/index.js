const { getInput } = require("../../utils");
const input = getInput(true).map((line) => {
  let pos = 0;
  let steps = [];
  while (pos < line.length) {
    if (line[pos] === "n" || line[pos] === "s") steps.push(line[pos++] + line[pos++]);
    else steps.push(line[pos++]);
  }
  return steps;
});

const direction = {
  e: [2, 0],
  se: [1, 1],
  sw: [-1, 1],
  w: [-2, 0],
  nw: [-1, -1],
  ne: [1, -1],
};

const cordsToId = ([x, y]) => `${x},${y}`;
const idToCords = (id) => id.split(",").map(Number);

const getInitialState = () => {
  const blacks = new Set();

  const flipTile = (steps) => {
    const cords = [0, 0];
    steps.forEach((step) => {
      const move = direction[step];
      cords[0] += move[0];
      cords[1] += move[1];
    });
    const posId = cordsToId(cords);
    if (blacks.has(posId)) blacks.delete(posId);
    else blacks.add(posId);
  };

  input.forEach(flipTile);

  return blacks;
};

const part1 = () => {
  return getInitialState().size;
};

const part2 = () => {
  const blacks = getInitialState();

  const getAdjacent = (posId) => {
    const cords = idToCords(posId);
    return (adjacent = [
      [cords[0] - direction.e[0], cords[1] - direction.e[1]],
      [cords[0] - direction.se[0], cords[1] - direction.se[1]],
      [cords[0] - direction.sw[0], cords[1] - direction.sw[1]],
      [cords[0] - direction.w[0], cords[1] - direction.w[1]],
      [cords[0] - direction.nw[0], cords[1] - direction.nw[1]],
      [cords[0] - direction.ne[0], cords[1] - direction.ne[1]],
    ]);
  };

  const getAdjacentWhites = (posId) => {
    return getAdjacent(posId).filter((x) => !blacks.has(cordsToId(x)));
  };

  const getAdjacentBlacks = (posId) => {
    return getAdjacent(posId).filter((x) => blacks.has(cordsToId(x)));
  };

  const getAllWhitesWithAdjacentBlacks = () => {
    const whitePosIds = new Set();
    blacks.forEach((blackPosId) => {
      const adjacentWhitePosIds = getAdjacentWhites(blackPosId).map(cordsToId);
      adjacentWhitePosIds.forEach((adjacentWhitePosId) => whitePosIds.add(adjacentWhitePosId));
    });
    return [...whitePosIds];
  };

  const tick = () => {
    const toDelete = [];
    const toAdd = [];

    blacks.forEach((posId) => {
      const adjacentBlackCount = getAdjacentBlacks(posId).length;
      if (adjacentBlackCount === 0 || adjacentBlackCount > 2) {
        toDelete.push(posId);
      }
    });

    const whites = getAllWhitesWithAdjacentBlacks();
    whites.forEach((posId) => {
      const adjacentBlackCount = getAdjacentBlacks(posId).length;
      if (adjacentBlackCount === 2) {
        toAdd.push(posId);
      }
    });

    toDelete.forEach((x) => blacks.delete(x));
    toAdd.forEach((x) => blacks.add(x));
  };

  for (let i = 0; i < 100; i++) tick();

  return blacks.size;
};

console.log("#1:", part1()); // 322
console.log("#2:", part2()); // 3831
