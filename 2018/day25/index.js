const { getInput } = require("../../utils");

const getDistance = (from, to) =>
  Math.abs(to[0] - from[0]) +
  Math.abs(to[1] - from[1]) +
  Math.abs(to[2] - from[2]) +
  Math.abs(to[3] - from[3]);

const tagConstellation = (points, point, constellationId) => {
  points
    .filter(p2 => p2.length == 4 && getDistance(point, p2) < 4)
    .forEach(p2 => {
      p2.push(constellationId);
      tagConstellation(points, p2, constellationId);
    });
};

const solve = () => {
  const points = getInput(true).map(x => x.split(",").map(y => parseInt(y)));

  let constellationIndex = 0;
  while ((point = points.find(p => p.length === 4))) {
    tagConstellation(points, point, constellationIndex++);
  }

  return {
    part1: constellationIndex
  };
};

const answer = solve();

console.log("#1:", answer.part1); // 375
// console.log("#2:", answer.part2);
