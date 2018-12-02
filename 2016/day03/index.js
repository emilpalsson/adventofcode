var { getInput, range } = require("../../utils");
const rows = getInput(true).map(r => r.match(/\d+/g).map(x => parseInt(x, 10)));

const isValidTriangle = sides =>
  sides[0] + sides[1] > sides[2] &&
  sides[0] + sides[2] > sides[1] &&
  sides[1] + sides[2] > sides[0];

const part1 = () => rows.filter(t => isValidTriangle(t)).length;

const part2 = () => {
  let validTriangles = 0;
  for (let r = 0; r < rows.length; r += 3) {
    range(3).forEach(c => {
      const sides = [rows[r][c], rows[r + 1][c], rows[r + 2][c]];
      if (isValidTriangle(sides)) {
        validTriangles++;
      }
    });
  }
  return validTriangles;
};

console.log("#1:", part1());
console.log("#2:", part2());
