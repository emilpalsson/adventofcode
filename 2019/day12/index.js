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
const initialStateX = JSON.stringify(
  moons.map(row => ({ p: row.x, v: row.vx }))
);
const initialStateY = JSON.stringify(
  moons.map(row => ({ p: row.y, v: row.vy }))
);
const initialStateZ = JSON.stringify(
  moons.map(row => ({ p: row.z, v: row.vz }))
);

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

// const move = moon => {
//   moon.x += moon.vx;
//   moon.y += moon.vy;
//   moon.z += moon.vz;
// };

// const getPotentialEnergy = moon =>
//   Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
// const getKineticEnergy = moon =>
//   Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
// const getEnergy = moon => getPotentialEnergy(moon) * getKineticEnergy(moon);

let ticksX = 0;
while (true) {
  ticksX++;
  moons.forEach(moon => {
    applyGravity(moon, "x");
  });
  moons.forEach(moon => {
    moon.x += moon.vx;
  });

  if (
    JSON.stringify(moons.map(row => ({ p: row.x, v: row.vx }))) ===
    initialStateX
  ) {
    console.log(ticksX);
    break;
  }
}

let ticksY = 0;
while (true) {
  ticksY++;
  moons.forEach(moon => {
    applyGravity(moon, "y");
  });
  moons.forEach(moon => {
    moon.y += moon.vy;
  });

  if (
    JSON.stringify(moons.map(row => ({ p: row.y, v: row.vy }))) ===
    initialStateY
  ) {
    console.log(ticksY);
    break;
  }
}

let ticksZ = 0;
while (true) {
  ticksZ++;
  moons.forEach(moon => {
    applyGravity(moon, "z");
  });
  moons.forEach(moon => {
    moon.z += moon.vz;
  });

  if (
    JSON.stringify(moons.map(row => ({ p: row.z, v: row.vz }))) ===
    initialStateZ
  ) {
    console.log(ticksZ);
    break;
  }
}

const calculateLowestCommonDenominator = (...numbers) => {
  const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);

    if (a < b) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    while (b != 0) {
      const c = a % b;
      a = b;
      b = c;
    }

    return a;
  };

  let result = numbers[0];
  for (let i = 1; i < numbers.length; ++i) {
    result = lcm(result, numbers[i]);
  }
  return result;
};
console.log(calculateLowestCommonDenominator(ticksX, ticksY, ticksZ));

// console.log(moons.map(getEnergy).reduce((sum, x) => sum + x, 0));

// console.log("#1:", part1());
// console.log("#2:\n" + part2());
