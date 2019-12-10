const { getInput } = require("../../utils");
const input = getInput(true).map(x => x.split(""));

const getAsteroids = () => {
  const result = [];
  input.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === "#") {
        result.push({ x, y, id: `${x},${y}` });
      }
    });
  });
  return result;
};
const asteroids = getAsteroids();

const getDistance = (a, b) =>
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

const getAngle = (a, b) => {
  let angle = Math.atan2(b.y - a.y, b.x - a.x);
  angle -= 1.5 * Math.PI; // Laser starts by pointing up
  while (angle < 0) {
    angle = 2 * Math.PI + angle; // Always count clockwise angle
  }
  return angle;
};

const getVisibleAsteroidCount = asteroid => {
  const angles = new Set();
  asteroids
    .filter(other => other.id !== asteroid.id)
    .forEach(other => angles.add(getAngle(asteroid, other)));
  return angles.size;
};

const getMonitoringStationAsteroid = () =>
  asteroids
    .map(a => ({ ...a, visibleCount: getVisibleAsteroidCount(a) }))
    .sort((a, b) => b.visibleCount - a.visibleCount)[0];

const getAngleToOtherAsteroids = asteroid =>
  asteroids
    .filter(other => other.id !== asteroid.id)
    .map(other => ({
      ...other,
      angle: getAngle(asteroid, other),
      distance: getDistance(asteroid, other)
    }))
    .sort((a, b) =>
      a.angle === b.angle ? a.distance - b.distance : a.angle - b.angle
    );

const calculate200thTarget = targets => {
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

const station = getMonitoringStationAsteroid();
const otherAsteroids = getAngleToOtherAsteroids(station);
const twohundredthTarget = calculate200thTarget(otherAsteroids);

console.log("#1:", station.visibleCount); // 319
console.log("#2:", twohundredthTarget.x * 100 + twohundredthTarget.y); // 517
