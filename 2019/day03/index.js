const { getInput } = require("../../utils");
const input = getInput(true, false).map(wire =>
  wire.split(",").map(move => ({
    direction: move.substr(0, 1),
    length: Number(move.substr(1))
    // x: move.startsWith('R') ? Number(move.substr(1)) : 0
  }))
);

// const getXYFromeMove = move => {
//   switch (move.direction) {
//     case "R":
//       return { x: move.length, y: 0 };
//     case "L":
//       return { x: -move.length, y: 0 };
//     case "D":
//       return { x: 0, y: move.length };
//     case "U":
//       return { x: 0, y: -move.length };
//   }
// };

const wire1 = input[0]; //.map(getXYFromeMove);
const wire2 = input[1];
const pos = { x: 0, y: 0 };

const id = () => `${pos.x};${pos.y}`;

const map = {};
const plotRight = (wire, length) => {
  // console.log("begin plot right");
  for (let i = 0; i < length; i++) {
    pos.x++;
    const currId = id();
    if (wire === 1) {
      map[currId] = 1;
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance());
      }
    }
    // console.log(pos);
  }
};
const plotLeft = (wire, length) => {
  // console.log("begin plot left");
  for (let i = 0; i < length; i++) {
    pos.x--;
    const currId = id();
    if (wire === 1) {
      map[currId] = 1;
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance());
      }
    }
    // console.log(pos);
  }
};
const plotDown = (wire, length) => {
  // console.log("begin plot down");
  for (let i = 0; i < length; i++) {
    pos.y++;
    const currId = id();
    if (wire === 1) {
      map[currId] = 1;
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance());
      }
    }
    // console.log(pos);
  }
};
const plotUp = (wire, length) => {
  // console.log("begin plot up");
  for (let i = 0; i < length; i++) {
    pos.y--;
    const currId = id();
    if (wire === 1) {
      map[currId] = 1;
    } else {
      if (map[currId]) {
        console.log("INTERSECTION", pos, getDistance());
      }
    }
    // console.log(pos);
  }
};

const intersections = [];
const getDistance = () => {
  const distance = Math.abs(pos.x) + Math.abs(pos.y);
  intersections.push(distance);
  return distance;
};

// wire1;

// let posX = 0;
// let posY = 0;

wire1.forEach(move => {
  // console.log(move);
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

console.log("\n\n\nWIRE 2\n\n\n");
wire2.forEach(move => {
  // console.log(move);
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

// console.log(Object.keys(map));

// console.log("#1:", part1()); // 3562672
// console.log("#2:", part2()); // 8250
