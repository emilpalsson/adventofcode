const { getInput } = require("../../utils");
const input = getInput(true);

const numberRegex = /\d+/g;
const symbolRegex = /[^0-9\.]/;

const part1 = () => {
  const parts = input.reduce((result, row, rowIndex) => {
    while ((match = numberRegex.exec(row))) {
      result.push({
        partNumber: Number(match[0]),
        partNumberLength: match[0].length,
        rowIndex,
        colIndex: match.index,
      });
    }
    return result;
  }, []);

  const hasAdjacentSymbol = (part) => {
    let surroundings = "";
    const fromRowIndex = Math.max(part.rowIndex - 1, 0);
    const toRowIndex = Math.min(part.rowIndex + 1, input.length - 1);
    for (let i = fromRowIndex; i <= toRowIndex; i++) {
      surroundings += input[i].substr(Math.max(part.colIndex - 1, 0), part.partNumberLength + 2);
    }
    return symbolRegex.test(surroundings);
  };

  parts.filter(hasAdjacentSymbol).reduce((sum, part) => sum + part.partNumber, 0); //?
};

const part2 = () => {};

console.log("#1:", part1()); // 525181
// console.log("#2:", part2());
