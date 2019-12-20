const { getInput } = require("../../utils");
const input = getInput(true).map(x => x.split(""));

const getParsedInput = () => {
  const centerX = Math.floor(input[0].length / 2);
  const centerY = Math.floor(input.length / 2);

  const getId = (x, y) => `${x},${y}`;

  const teleporters = [];

  const locateTeleportersOnTopRow = (y, minX = 0, maxX = Infinity) => {
    input[y].forEach((cell, x) => {
      if (x < minX || x > maxX) {
        return;
      }
      if (cell === ".") {
        const teleporterId = input[y - 2][x] + input[y - 1][x];
        teleporters.push({
          id: teleporterId,
          entrance: getId(x, y - 1),
          exit: getId(x, y)
        });
      }
    });
  };
  const locateTeleportersOnBottomRow = (y, minX = 0, maxX = Infinity) => {
    input[y].forEach((cell, x) => {
      if (x < minX || x > maxX) {
        return;
      }
      if (cell === ".") {
        const teleporterId = input[y + 1][x] + input[y + 2][x];
        teleporters.push({
          id: teleporterId,
          entrance: getId(x, y + 1),
          exit: getId(x, y)
        });
      }
    });
  };

  const locateTeleportersOnLeftCol = (x, minY = 0, maxY = Infinity) => {
    input.forEach((row, y) => {
      if (y < minY || y > maxY) {
        return;
      }
      if (row[x] === ".") {
        const teleporterId = input[y][x - 2] + input[y][x - 1];
        teleporters.push({
          id: teleporterId,
          entrance: getId(x - 1, y),
          exit: getId(x, y)
        });
      }
    });
  };
  const locateTeleportersOnRightCol = (x, minY = 0, maxY = Infinity) => {
    input.forEach((row, y) => {
      if (y < minY || y > maxY) {
        return;
      }
      if (row[x] === ".") {
        const teleporterId = input[y][x + 1] + input[y][x + 2];
        teleporters.push({
          id: teleporterId,
          entrance: getId(x + 1, y),
          exit: getId(x, y)
        });
      }
    });
  };

  const findHeight = () =>
    input.findIndex((col, y) => y > 1 && /[ A-Z]/.test(col[centerX])) - 2;
  const findWidth = () =>
    input[centerY].findIndex((cell, x) => x > 1 && /[ A-Z]/.test(cell)) - 2;
  const height = findHeight();
  const width = findWidth();
  const innerTop = 2 + height;
  const innerLeft = 2 + width;
  const innerBottom = input.length - 3 - height;
  const innerRight = input[0].length - 3 - width;

  // Outer
  locateTeleportersOnTopRow(2);
  locateTeleportersOnBottomRow(input.length - 3);
  locateTeleportersOnLeftCol(2);
  locateTeleportersOnRightCol(input[0].length - 3);

  // Inner
  locateTeleportersOnBottomRow(innerTop - 1, innerLeft, innerRight);
  locateTeleportersOnTopRow(innerBottom + 1, innerLeft, innerRight);
  locateTeleportersOnRightCol(innerLeft - 1, innerTop, innerBottom);
  locateTeleportersOnLeftCol(innerRight + 1, innerTop, innerBottom);

  let start;
  let goal;
  const teleporterMap = {};
  teleporters.forEach((teleporter, index) => {
    const exit = teleporters.find(
      (other, otherIndex) => otherIndex != index && other.id === teleporter.id
    );
    if (exit) {
      // teleporter;
      teleporterMap[teleporter.entrance] = exit.exit;
    } else {
      if (teleporter.id === "AA") {
        start = teleporter.exit;
      } else {
        goal = teleporter.exit;
      }
    }
  });

  /* PATWAY */

  const pathway = new Set();
  input.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === ".") {
        pathway.add(getId(x, y));
      }
    });
  });

  // pathway;
  // start;
  // goal;

  // console.log(teleporters);
  // console.log(teleporterMap);

  return {
    pathway,
    start,
    goal,
    teleporterMap
  };
};

module.exports = { getParsedInput };
