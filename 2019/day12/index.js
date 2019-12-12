const { getInput, getLowestCommonDenominator } = require("../../utils");
const input = getInput(true);

const getMoons = () =>
  input
    .map(row => row.split(/[^-\d]+/))
    .map(parts => ({
      x: { pos: Number(parts[1]), vel: 0 },
      y: { pos: Number(parts[2]), vel: 0 },
      z: { pos: Number(parts[3]), vel: 0 }
    }));

const applyGravity = (moon, axis, otherMoons) =>
  otherMoons.forEach(other => {
    if (moon === other) {
      return;
    }
    if (moon[axis].pos < other[axis].pos) {
      moon[axis].vel++;
    } else if (moon[axis].pos > other[axis].pos) {
      moon[axis].vel--;
    }
  });

const part1 = () => {
  const getPotentialEnergy = moon =>
    Math.abs(moon.x.pos) + Math.abs(moon.y.pos) + Math.abs(moon.z.pos);
  const getKineticEnergy = moon =>
    Math.abs(moon.x.vel) + Math.abs(moon.y.vel) + Math.abs(moon.z.vel);
  const getEnergy = moon => getPotentialEnergy(moon) * getKineticEnergy(moon);

  const moons = getMoons();

  for (let i = 0; i < 1000; i++) {
    moons.forEach(moon => {
      applyGravity(moon, "x", moons);
      applyGravity(moon, "y", moons);
      applyGravity(moon, "z", moons);
    });
    moons.forEach(moon => {
      moon.x.pos += moon.x.vel;
      moon.y.pos += moon.y.vel;
      moon.z.pos += moon.z.vel;
    });
  }

  const totalEnergy = moons.map(getEnergy).reduce((sum, x) => sum + x, 0);
  return totalEnergy;
};

const part2 = () => {
  const getAxisState = axis => JSON.stringify(moons.map(row => row[axis]));

  const findAxisRepeatInterval = axis => {
    let ticks = 0;
    while (true) {
      ticks++;
      moons.forEach(moon => applyGravity(moon, axis, moons));
      moons.forEach(moon => (moon[axis].pos += moon[axis].vel));
      if (getAxisState(axis) === initialState[axis]) {
        return ticks;
      }
    }
  };

  const moons = getMoons();
  const initialState = {
    x: getAxisState("x"),
    y: getAxisState("y"),
    z: getAxisState("z")
  };

  const intervalX = findAxisRepeatInterval("x");
  const intervalY = findAxisRepeatInterval("y");
  const intervalZ = findAxisRepeatInterval("z");
  return getLowestCommonDenominator(intervalX, intervalY, intervalZ);
};

console.log("#1:", part1()); // 10189
console.log("#2:", part2()); // 469671086427712
