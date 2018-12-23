const { getInput } = require("../../utils");
const input = getInput(true);

const parseInput = input =>
  input
    .map(row => row.split(", ").map(item => parseInt(item)))
    .map(point => [...point, id(point)]);

const getDistance = (from, to) =>
  Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);

const id = coords => `${coords[0]}x${coords[1]}`;

const getBounds = points => {
  const x = points.map(p => p[0]);
  const y = points.map(p => p[1]);
  return {
    north: Math.min(...y),
    south: Math.max(...y),
    west: Math.min(...x),
    east: Math.max(...x)
  };
};

const getPointsWithFiniteSize = (points, bounds) => {
  const finitePointSizes = {};
  points.forEach(point => {
    if (!hasInfiniteSize(bounds, points, point)) {
      finitePointSizes[id(point)] = 0;
    }
  });
  return finitePointSizes;
};

const getClosestPoints = (points, coords) => {
  const distances = points.map(point => ({
    point,
    distance: getDistance(point, coords)
  }));
  distances.sort((a, b) => a.distance - b.distance);
  if (distances[0].distance === distances[1].distance) {
    return null;
  }
  return distances[0];
};

const hasInfiniteSize = (bounds, points, point) => {
  const pointId = id(point);

  const closestBoundsCoords = [
    [bounds.west, point[1]],
    [bounds.east, point[1]],
    [point[0], bounds.north],
    [point[0], bounds.south]
  ];

  return closestBoundsCoords
    .map(point => getClosestPoints(points, point))
    .filter(x => x)
    .some(x => x.point[2] === pointId);
};

const calculatePointSizes = (bounds, points) => {
  const finitePointSizes = getPointsWithFiniteSize(points, bounds);
  for (let y = bounds.north; y <= bounds.south; y++) {
    for (let x = bounds.west; x <= bounds.east; x++) {
      const closestPoint = getClosestPoints(points, [x, y]);
      if (closestPoint) {
        const closestPointId = closestPoint.point[2];
        if (typeof finitePointSizes[closestPointId] !== "undefined") {
          finitePointSizes[closestPointId]++;
        }
      }
    }
  }
  return Object.entries(finitePointSizes);
};

const getRegionCloseToAllPoints = (bounds, points) => {
  let pointCount = 0;
  for (let y = bounds.north; y <= bounds.south; y++) {
    for (let x = bounds.west; x <= bounds.east; x++) {
      const totalDistance = points.reduce(
        (result, point) => result + getDistance([x, y], point),
        0
      );
      if (totalDistance < 10000) {
        pointCount++;
      }
    }
  }
  return pointCount;
};

const solve = () => {
  const points = parseInput(input);
  const bounds = getBounds(points);

  // part 1
  const pointSizes = calculatePointSizes(bounds, points);
  pointSizes.sort((a, b) => b[1] - a[1]);
  const sizeOfPointFurthestFromOtherPoints = pointSizes[0][1];

  // part 2
  const regionCloseToAllPoints = getRegionCloseToAllPoints(bounds, points);

  return {
    part1: sizeOfPointFurthestFromOtherPoints,
    part2: regionCloseToAllPoints
  };
};
const answer = solve();

console.log("#1:", answer.part1); // 4754
console.log("#2:", answer.part2); // 42344
