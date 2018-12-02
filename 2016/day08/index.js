const { getInput, range } = require("../../utils");
const instructions = getInput(true).map(x => x.split(/[ =xyb]+/));

const screen = range(6).map(i => range(50).fill(" "));

const rect = (a, b) => {
  range(b).forEach(bi => {
    range(a).forEach(ai => {
      screen[bi][ai] = "#";
    });
  });
};

const rotate = (arr, steps) => [...arr.slice(-steps), ...arr.slice(0, -steps)];

const rotateColumn = (index, steps) => {
  let column = screen.map(row => row[index]);
  column = rotate(column, steps);
  column.forEach((value, rowIndex) => (screen[rowIndex][index] = value));
};

const rotateRow = (index, steps) => {
  screen[index] = rotate(screen[index], steps);
};

instructions.forEach(p => {
  if (p[0] === "rect") {
    rect(parseInt(p[1], 10), parseInt(p[2], 10));
  } else if (p[1] === "column") {
    rotateColumn(parseInt(p[2], 10), parseInt(p[3], 10));
  } else {
    rotateRow(parseInt(p[2], 10), parseInt(p[3], 10));
  }
});

const activePixels = screen.reduce((sum, row) => {
  return sum + row.filter(c => c === "#").length;
}, 0);

console.log("#1:", activePixels);
console.log("#2:", "\n" + screen.map(row => row.join("")).join("\n"));
