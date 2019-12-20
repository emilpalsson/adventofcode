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
        return { xy: getXy(teleporterExit.pos), level: teleporterExit.level };
      }
      return { xy, level: 0 };
    })
    .filter(neighbor => isPathway(neighbor.xy))
    .map(neighbor => ({
      posId: getId(neighbor.xy[0], neighbor.xy[1]),
      level: neighbor.level
    }));
};

let shortestPath = Infinity;
const traverse = state => {
  if (state.level === 0 && state.position === goal) {
    shortestPath = state.steps;
    return;
  }

  if (state.steps > shortestPath) {
    return;
  }

  const neighbors = getNeighbors(getXy(state.position)).filter(
    neighbor =>
      (state.hasSeen[`${neighbor.posId},${state.level + neighbor.level}`] ||
        Infinity) >
      state.steps + 1
  );
  neighbors.forEach(neighbor => {
    const nextState = {
      position: neighbor.posId,
      steps: state.steps + 1,
      hasSeen: {
        ...state.hasSeen,
        [`${neighbor.posId},${state.level + neighbor.level}`]: state.steps + 1
      },
      level: state.level + neighbor.level
    };
    if (nextState.level < 0 || nextState.level > 100) return;
    traverse(nextState);
  });
};

traverse({
  position: start,
  steps: 0,
  hasSeen: { [start]: 0 },
  level: 0
});

console.log(shortestPath);
