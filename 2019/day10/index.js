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

const round = x => Math.round(x * 100) / 100;

const getDistance = (a, b) =>
  round(Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)));

const getAngle = (a, b) => {
  let angle = Math.atan2(b.y - a.y, b.x - a.x);
  angle -= 1.5 * Math.PI; // Laser starts by pointing up
  while (angle < 0) {
    angle = 2 * Math.PI + angle; // Always count clockwise angle
  }
  return angle;
};

const tryAdd = (set, item) => {
  if (set.has(item)) {
    return false;
  }
  set.add(item);
  return true;
};

const getAsteroidCountInLineOfSight = asteroid => {
  const blockedAngles = new Set();
  const asteroidsInLineOfSight = asteroids
    .filter(other => other !== asteroid)
    .filter(other => tryAdd(blockedAngles, getAngle(asteroid, other)));
  return asteroidsInLineOfSight.length;
};

const getAsteroidBestSuitedForMonitoringStation = () => {
  const asteroidsWithLineOfSightCount = asteroids.map(asteroid => ({
    ...asteroid,
    count: getAsteroidCountInLineOfSight(asteroid)
  }));
  asteroidsWithLineOfSightCount.sort((a, b) => b.count - a.count);
  return asteroidsWithLineOfSightCount[0];
};
const station = getAsteroidBestSuitedForMonitoringStation();

const getAngleToOtherAsteroids = asteroid =>
  asteroids
    .filter(other => !(other.x === asteroid.x && other.y === asteroid.y))
    .map(other => ({
      ...other,
      angle: getAngle(asteroid, other),
      distance: getDistance(asteroid, other)
    }))
    .sort((a, b) => {
      if (a.angle === b.angle) {
        return a.distance - b.distance;
      }
      return a.angle - b.angle;
    });

const otherAsteroids = getAngleToOtherAsteroids(station);

const pewpew = targets => {
  let laserAngle = -1;
  let pointer = 0;
  let target;

  for (let i = 0; i < 200; i++) {
    while (targets[pointer].angle === laserAngle) {
      pointer++;
    }
    laserAngle = targets[pointer].angle;
    target = targets.splice(pointer, 1)[0];
  }
  return target;
};
const bestBet = pewpew(otherAsteroids);
console.log(bestBet.x * 100 + bestBet.y);

console.log("#1:", station.count); // 319
// console.log("#2:", run(2)); // 1406 too high
