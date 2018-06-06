var { getInput, range } = require("../utils");
const input = getInput(18)
  .split("")
  .map(x => x === "^");

const getSafeTiles = rows => {
  let count = 0;
  let row = input;
  range(rows).forEach(i => {
    count += row.filter(x => !x).length;
    row = row.map((center, i) => !!row[i - 1] !== !!row[i + 1]);
  });
  return count;
};

console.log("#1:", getSafeTiles(40));
console.log("#2:", getSafeTiles(400000));
