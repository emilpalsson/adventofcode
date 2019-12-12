const { getInput } = require("../../utils");
const input = getInput(true);

const moons = input
  .map(row => row.split(/[=,>]/))
  .map(parts => ({
    x: Number(parts[1]),
    y: Number(parts[3]),
    z: Number(parts[5]),
    vx: 0,
    vy: 0,
    vz: 0
  }));
moons;

const applyGravity = (moon, axis) => {
  moons.forEach(other => {
    if (moon === other) {
      return;
    }
    if (moon[axis] < other[axis]) {
      moon[`v${axis}`]++;
    } else if (moon[axis] > other[axis]) {
      moon[`v${axis}`]--;
    }
  });
};

const move = moon => {
  moon.x += moon.vx;
  moon.y += moon.vy;
  moon.z += moon.vz;
};

const getPotentialEnergy = moon =>
  Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
const getKineticEnergy = moon =>
  Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
const getEnergy = moon => getPotentialEnergy(moon) * getKineticEnergy(moon);

for (let i = 0; i < 1000; i++) {
  moons.forEach(moon => {
    applyGravity(moon, "x");
    applyGravity(moon, "y");
    applyGravity(moon, "z");
  });
  moons.forEach(moon => {
    move(moon);
  });
}

moons;

console.log(moons.map(getEnergy).reduce((sum, x) => sum + x, 0));

// console.log("#1:", part1());
// console.log("#2:\n" + part2());
