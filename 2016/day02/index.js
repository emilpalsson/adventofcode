var { getInput, range } = require("../../utils");
const rows = getInput(true).map(row => row.split(""));

const getCode = numpadLayout => {
  let code = "";
  let y = numpadLayout.findIndex(y => y.includes("5"));
  let x = numpadLayout[y].indexOf("5");
  const lastKeyIndex = numpadLayout[0].length - 1;
  rows.forEach(row => {
    row.forEach(move => {
      const oldX = x;
      const oldY = y;
      switch (move) {
        case "U":
          y = Math.max(y - 1, 0);
          break;
        case "D":
          y = Math.min(y + 1, lastKeyIndex);
          break;
        case "L":
          x = Math.max(x - 1, 0);
          break;
        case "R":
          x = Math.min(x + 1, lastKeyIndex);
          break;
      }
      if (numpadLayout[y][x] === " ") {
        x = oldX;
        y = oldY;
      }
    });
    code += numpadLayout[y][x];
  });
  return code;
};

const part1Numpad = ["123", "456", "789"];
const part2Numpad = ["  1  ", " 234 ", "56789", " ABC ", "  D  "];
console.log("#1:", getCode(part1Numpad));
console.log("#2:", getCode(part2Numpad));
