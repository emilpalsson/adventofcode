const { getParsedInput } = require("./parseMap");

const { pathway, start, goal, teleporterMap } = getParsedInput();

const getId = (x, y) => `${x},${y}`;
const getXy = posId => posId.split(",").map(Number);

const isPathway = ([x, y]) => !!pathway.has(getId(x, y));
const getNeighbors = ([x, y]) => {
  return [
    [x, y - 1], // up
    [x + 1, y], // right
    [x, y + 1], // down
    [x - 1, y] // left
  ]
    .map(xy => {
      const teleporterExit = teleporterMap[getId(xy[0], xy[1])];
      if (teleporterExit) {
        return getXy(teleporterExit);
      }
      return xy;
    })
    .filter(xy => isPathway(xy))
    .map(xy => getId(xy[0], xy[1]));
};

let shortestPath = Infinity;
const traverse = state => {
  if (state.position === goal) {
    shortestPath = state.steps;
    return;
  }

  if (state.steps > shortestPath) {
    return;
  }

  const neighbors = getNeighbors(getXy(state.position)).filter(
    neighbor => (state.hasSeen[neighbor] || Infinity) > state.steps + 1
  );
  neighbors.forEach(neighbor => {
    const nextState = {
      position: neighbor,
      steps: state.steps + 1,
      hasSeen: { ...state.hasSeen, [neighbor]: state.steps + 1 }
    };
    traverse(nextState);
  });
};

traverse({
  position: start,
  steps: 0,
  hasSeen: { [start]: 0 }
});

console.log(shortestPath);
