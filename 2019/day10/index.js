const { getInput } = require("../../utils");
const input = getInput(true).map(x => x.split(""));

const getAsteroids = () => {
  const result = [];
  input.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === "#") {
        result.push({ x, y });
      }
    });
  });
  return result;
};
const asteroids = getAsteroids();

const getAsteroidCountInLineOfSight = asteroid => {
  const blockedAngles = new Set();
  const asteroidsInLineOfSight = asteroids
    .filter(otherAsteroid => otherAsteroid !== asteroid)
    .filter(otherAsteroid => {
      const angle = Math.atan2(
        otherAsteroid.y - asteroid.y,
        otherAsteroid.x - asteroid.x
      );
      if (blockedAngles.has(angle)) {
        return false;
      }
      blockedAngles.add(angle);
      return true;
    });
  return asteroidsInLineOfSight.length;
};

console.log(Math.max(...asteroids.map(getAsteroidCountInLineOfSight))); // 319

// console.log("#1:", run(1));
// console.log("#2:", run(2));
