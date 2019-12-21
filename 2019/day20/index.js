const { getParsedInput } = require("./parseMap");
const { astar } = require("../../utils/astar");

const { pathway, start, goal, teleporterMap } = getParsedInput();

const getId = (x, y) => `${x},${y}`;
const getXy = posId => posId.split(",").map(Number);

const teleporters = Object.entries(teleporterMap);
const entrances = [start, ...teleporters.map(x => x[1].pos)];
const exits = [goal, ...teleporters.map(x => x[0])];

const getDistance = (entrance, exit) => {
  const isPathway = ([x, y]) => pathway.has(getId(x, y));
  const getNeighbors = ([x, y]) =>
    [
      [x, y - 1], // up
      [x + 1, y], // right
      [x, y + 1], // down
      [x - 1, y] // left
    ].filter(xy => isPathway(xy) || getId(xy[0], xy[1]) === exit);
  return astar(getXy(entrance), getXy(exit), getNeighbors);
};

const entranceMap = {};
entrances.forEach(entrance => {
  const possibleExits = [];
  exits.forEach(exit => {
    const distance = getDistance(entrance, exit);
    if (distance && distance > 1) {
      possibleExits.push({ id: exit, distance });
    }
  });
  entranceMap[entrance] = possibleExits;
});

let shortestPath = Infinity;
const traverse = state => {
  if (state.steps > shortestPath) {
    return;
  }

  const possibleExits = entranceMap[state.position];
  possibleExits.forEach(exit => {
    if (exit.id === goal) {
      if (state.level === 0) {
        shortestPath = state.steps + exit.distance;
      }
      return;
    }

    const nextEntrance = teleporterMap[exit.id];

    if (
      (state.hasSeen[`${exit.pos},${state.level + exit.level}`] || Infinity) <
      state.steps + nextEntrance.level
    ) {
      return;
    }

    const nextState = {
      position: nextEntrance.pos,
      steps: state.steps + exit.distance,
      hasSeen: {
        ...state.hasSeen,
        [`${nextEntrance.pos},${state.level + exit.distance}`]:
          state.steps + exit.distance
      },
      level: state.level + nextEntrance.level
    };
    if (nextState.level < 0 || nextState.level > 25) return;
    traverse(nextState);
  });
};

traverse({
  position: start,
  steps: 0,
  hasSeen: { [`${start},0`]: 0 },
  level: 0
});

console.log(shortestPath);
