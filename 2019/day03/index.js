const { getInput } = require("../../utils");
const input = getInput(true, false).map(wire =>
  wire.split(",").map(move => ({
    direction: move.substr(0, 1),
    length: Number(move.substr(1))
  }))
);

const wire1 = input[0]; //.map(getXYFromeMove);
const wire2 = input[1];
const pos = { x: 0, y: 0 };

const id = () => `${pos.x};${pos.y}`;

let minTotal = Infinity;

let steps = 0;
const map = {};
const plotRight = (wire, length) => {
  for (let i = 0; i < length; i++) {
    steps++;
    pos.x++;
    const currId = id();
    if (wire === 1) {
      if (!map[currId]) {
        map[currId] = steps;
      }
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance(), map[currId] + steps);
        const totalSteps = map[currId] + steps;
        if (totalSteps < minTotal) {
          minTotal = totalSteps;
        }
      }
    }
  }
};
const plotLeft = (wire, length) => {
  for (let i = 0; i < length; i++) {
    steps++;
    pos.x--;
    const currId = id();
    if (wire === 1) {
      if (!map[currId]) {
        map[currId] = steps;
      }
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance(), map[currId] + steps);
        const totalSteps = map[currId] + steps;
        if (totalSteps < minTotal) {
          minTotal = totalSteps;
        }
      }
    }
  }
};
const plotDown = (wire, length) => {
  for (let i = 0; i < length; i++) {
    steps++;
    pos.y++;
    const currId = id();
    if (wire === 1) {
      if (!map[currId]) {
        map[currId] = steps;
      }
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance(), map[currId] + steps);
        const totalSteps = map[currId] + steps;
        if (totalSteps < minTotal) {
          minTotal = totalSteps;
        }
      }
    }
  }
};
const plotUp = (wire, length) => {
  for (let i = 0; i < length; i++) {
    steps++;
    pos.y--;
    const currId = id();
    if (wire === 1) {
      if (!map[currId]) {
        map[currId] = steps;
      }
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance(), map[currId] + steps);
        const totalSteps = map[currId] + steps;
        if (totalSteps < minTotal) {
          minTotal = totalSteps;
        }
      }
    }
  }
};

const intersections = [];
const getDistance = () => {
  const distance = Math.abs(pos.x) + Math.abs(pos.y);
  intersections.push(distance);
  return distance;
};

wire1.forEach(move => {
  switch (move.direction) {
    case "R":
      plotRight(1, move.length);
      break;
    case "L":
      plotLeft(1, move.length);
      break;
    case "D":
      plotDown(1, move.length);
      break;
    case "U":
      plotUp(1, move.length);
      break;
  }
});

pos.x = 0;
pos.y = 0;
steps = 0;

wire2.forEach(move => {
  switch (move.direction) {
    case "R":
      plotRight(2, move.length);
      break;
    case "L":
      plotLeft(2, move.length);
      break;
    case "D":
      plotDown(2, move.length);
      break;
    case "U":
      plotUp(2, move.length);
      break;
  }
});

intersections.sort();
console.log(intersections);

minTotal;

// console.log(Object.keys(map));

// console.log("#1:", part1()); // 3562672
// console.log("#2:", part2()); // 8250
