const { getInput } = require("../../utils");
const { astar } = require("../../utils/astar");
const input = getInput(true).map(x => x.split(""));

const MAPSTATE = {
  ENTRANCE: "@",
  OPEN_SPACE: ".",
  WALL: "#",
  KEY: "&"
};

const getId = (x, y) => `${x},${y}`;

const walls = {};
const routes = [
  {
    // map: {},
    keys: {},
    doors: {},
    steps: 0,
    mapKeys: {},
    mapDoors: {}
  }
];

input.forEach((row, y) => {
  row.forEach((cell, x) => {
    // let mapState = cell;
    if (/[a-z]/.test(cell)) {
      routes[0].keys[cell] = { x, y };
      mapState = MAPSTATE.KEY;
      routes[0].mapKeys[getId(x, y)] = cell;
    } else if (/[A-Z]/.test(cell)) {
      routes[0].doors[cell] = { x, y };
      mapState = MAPSTATE.WALL;
      routes[0].mapDoors[getId(x, y)] = cell;
    } else if (cell === MAPSTATE.ENTRANCE) {
      routes[0].pos = { x, y };
      mapState = MAPSTATE.OPEN_SPACE;
    } else if (cell === MAPSTATE.WALL) {
      walls[getId(x, y)] = true;
    }

    // routes[0].map[getId(x, y)] = mapState;
  });
});
// console.log(routes[0]);

// console.log(routes[0]);

// let first = true;
const getDistanceAndRequiredKeys = (from, to) => {
  const isWall = ([x, y]) => walls[getId(x, y)];
  const getNeighbors = ([x, y]) => {
    return [
      [x, y - 1], // up
      [x + 1, y], // right
      [x, y + 1], // down
      [x - 1, y] // left
    ].filter(xy => !isWall(xy));
  };

  const result = astar(from, to, getNeighbors, true);
  const requiredKeys = [];
  result.path.forEach(([x, y]) => {
    const door = routes[0].mapDoors[getId(x, y)];
    if (door) {
      requiredKeys.push(door.toLowerCase());
    }
  });
  return { distance: result.distance, requiredKeys };
};

const distances = {};
const keys = routes[0].keys;

const keysAndStartPos = [
  ["@", { x: routes[0].pos.x, y: routes[0].pos.y }],
  ...Object.entries(keys)
];

keysAndStartPos.forEach(([key, pos]) => {
  const distancesForCurrentKey = [];
  Object.entries(keys).forEach(([otherKey, otherPos]) => {
    if (key === otherKey) {
      return;
    }
    const result = getDistanceAndRequiredKeys(
      [pos.x, pos.y],
      [otherPos.x, otherPos.y]
    );
    distancesForCurrentKey.push({
      key: otherKey,
      distance: result.distance,
      requiredKeys: result.requiredKeys
    });
  });
  distances[key] = distancesForCurrentKey;
});

const maxDistanceBetweenTwoKeys = Math.ceil(
  Math.max(...distances.a.map(x => x.distance)) / 4
);
console.log(maxDistanceBetweenTwoKeys);

const keyCount = Object.keys(distances).length - 1;

let shortestSoFar = {};

let winningRoute;
let minFinish = Infinity;
const walk2 = state => {
  if (state.pickedUpKeys.length === keyCount) {
    // console.log("Finish after", state.traveled); // TODO: DOUBLE 86??
    // console.log(state);
    if (state.traveled < minFinish) {
      minFinish = state.traveled;
      winningRoute = state;
    }
    // let
    // minFinish = Math.min(minFinish, state.traveled);
    return; // All picked up
  }

  const possibleRoutes = distances[state.currentLocation].filter(otherKey => {
    const alreadyPickedUp = state.pickedUpKeys.includes(otherKey.key);
    const doorBlocking = otherKey.requiredKeys.some(
      x => !state.pickedUpKeys.includes(x)
    );
    return !alreadyPickedUp && !doorBlocking;
  });

  // if (possibleRoutes.length > 1) {
  //   console.log(possibleRoutes);
  // }

  possibleRoutes.forEach((route, i) => {
    // if (i === 0) {
    //   console.log(i);
    //   return;
    // }
    const pickedUpKeys = [...state.pickedUpKeys, route.key].sort();
    const nextState = {
      currentLocation: route.key,
      pickedUpKeys,
      traveled: state.traveled + route.distance,
      pickupOrder: state.pickupOrder + route.key
    };
    const shortestSoFarKey = pickedUpKeys.join("");
    const otherShortestSoFar = shortestSoFar[shortestSoFarKey] || Infinity;
    if (otherShortestSoFar + maxDistanceBetweenTwoKeys <= nextState.traveled) {
      // if (shortestSoFarKey === "abcde") {
      //   console.log(shortestSoFarKey, otherShortestSoFar, nextState.traveled);
      return;
      // }
    }
    if (otherShortestSoFar > nextState.traveled) {
      shortestSoFar[shortestSoFarKey] = nextState.traveled;
    }
    walk2(nextState);
  });
};

let state = {
  currentLocation: "@",
  pickedUpKeys: [],
  traveled: 0,
  pickupOrder: ""
};
walk2(state);

console.log(winningRoute); // 6426 too high

return;

// keys;
// doors;
// pos;
// map;

const getOptions = route => {
  const isBlock = ([x, y]) => walls[getId(x, y)] || route.mapDoors[getId(x, y)];
  const getNeighbors = ([x, y]) => {
    // console.log(route.map[getId(x, y)], MAPSTATE.KEY);
    if (route.mapKeys[getId(x, y)]) {
      return [];
    }
    return [
      [x, y - 1], // up
      [x + 1, y], // right
      [x, y + 1], // down
      [x - 1, y] // left
    ].filter(xy => !isBlock(xy));
  };

  const options = Object.entries(route.keys)
    .map(entry => {
      const key = entry[0];
      const keyPos = entry[1];
      const distance = astar(
        [route.pos.x, route.pos.y],
        [keyPos.x, keyPos.y],
        getNeighbors
      );
      return { key, distance };
    })
    .filter(option => option.distance);
  return options;
};

let steps = 0;
const walk = route => {
  const options = getOptions(route);
  // options;

  if (options.length > 1) {
    // console.log("multi options", options);
    // console.log(options);
    routes.push(JSON.parse(JSON.stringify(route)));
    followOption(routes[routes.length - 1], options[1]);
    // console.log(
    //   [routes[routes.length - 1]].map(route => ({
    //     steps: route.steps,
    //     pos: route.pos
    //   }))
    // );
  }

  if (options.length > 0) {
    followOption(route, options[0]);
  }
};

const followOption = (route, option) => {
  route.pos = { ...route.keys[option.key] };
  route.steps += option.distance;
  const keyPos = route.keys[option.key];
  const doorPos = route.doors[option.key.toUpperCase()];
  if (doorPos) {
    delete route.mapDoors[getId(doorPos.x, doorPos.y)];
    // route.map[getId(doorPos.x, doorPos.y)] = MAPSTATE.OPEN_SPACE;
    delete route.doors[option.key.toUpperCase()];
  }
  delete route.mapKeys[getId(keyPos.x, keyPos.y)];
  // route.map[getId(keyPos.x, keyPos.y)] = MAPSTATE.OPEN_SPACE;
  delete route.keys[option.key];
};

for (let i = 0; i < 100; i++) {
  routes.forEach(route => {
    walk(route);
  });
  console.log(i);
  // routes[0].steps;
  // routes[0].pos;
  // console.log(routes.map(route => ({ steps: route.steps, pos: route.pos })));
}

console.log(routes.map(route => ({ steps: route.steps, pos: route.pos })));

// const answer = solve();
// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
