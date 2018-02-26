const md5 = require("md5");
var { getInput } = require("../utils");
const input = getInput(17);

let shortestSolution;
let longestSolutionLength = 0;

const getOpenDoors = (x, y, path) => {
  const state = md5(input + path)
    .substr(0, 4)
    .split("")
    .map(s => /[b-f]/.test(s));
  const openDoors = [];
  if (y > 0 && state[0]) openDoors.push("U");
  if (y < 3 && state[1]) openDoors.push("D");
  if (x > 0 && state[2]) openDoors.push("L");
  if (x < 3 && state[3]) openDoors.push("R");
  return openDoors;
};

const getNextPos = (x, y, direction) => {
  // prettier-ignore
  switch (direction) {
    case 'U': y--; break;
    case 'D': y++; break;
    case 'L': x--; break;
    case 'R': x++; break;
  }
  return { x, y };
};

const move = (x = 0, y = 0, path = "") => {
  const openDoors = getOpenDoors(x, y, path);
  const moves = path.length + 1;
  openDoors.forEach(door => {
    const nextPos = getNextPos(x, y, door);
    if (nextPos.x === 3 && nextPos.y === 3) {
      if (longestSolutionLength < moves) {
        longestSolutionLength = moves;
      }
      if (!shortestSolution || shortestSolution.length > moves) {
        shortestSolution = path + door;
      }
      return;
    }
    move(nextPos.x, nextPos.y, path + door);
  });
};

move();
console.log("#1:", shortestSolution);
console.log("#2:", longestSolutionLength);
