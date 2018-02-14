var { getInput, range } = require("../utils");
const commands = getInput(1).split(", ");

/* prettier-ignore */
const turn = (direction, command) => {
  const angle = command.substr(0, 1);
  switch (direction) {
    case "N": return angle === "R" ? "E" : "W";
    case "E": return angle === "R" ? "S" : "N";
    case "S": return angle === "R" ? "W" : "E";
    case "W": return angle === "R" ? "N" : "S";
  }
};

/* prettier-ignore */
const move = (position, direction) => {
  switch (direction) {
    case "N": position.y++; break;
    case "E": position.x++; break;
    case "S": position.y--; break;
    case "W": position.x--; break;
  }
};

let direction = "N";
const position = {
  x: 0,
  y: 0,
  get tag() {
    return `${this.x};${this.y}`;
  },
  get distance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
};
const visited = {};
let distanceToFirstVisited;

commands.forEach(command => {
  direction = turn(direction, command);
  range(parseInt(command.substr(1), 10)).forEach(() => {
    move(position, direction);
    if (!distanceToFirstVisited) {
      if (visited[position.tag]) {
        distanceToFirstVisited = position.distance;
      }
      visited[position.tag] = true;
    }
  });
});

console.log("#1:", position.distance);
console.log("#2:", distanceToFirstVisited);
