const { getInput, range, sum } = require("../../utils");
const input = getInput(true);

const numberRegex = /\d+/g;
const symbolRegex = /[^0-9\.]/;
const gearRegex = /\*/g;

const numbers = input.reduce((result, row, rowIndex) => {
  while ((match = numberRegex.exec(row))) {
    result.push({
      value: Number(match[0]),
      valueLength: match[0].length,
      rowIndex,
      colIndex: match.index,
      colIndexes: range(match[0].length).map((i) => i + match.index),
    });
  }
  return result;
}, []);

const part1 = () => {
  const hasAdjacentSymbol = (part) => {
    let surroundings = "";
    const fromRowIndex = Math.max(part.rowIndex - 1, 0);
    const toRowIndex = Math.min(part.rowIndex + 1, input.length - 1);
    for (let i = fromRowIndex; i <= toRowIndex; i++) {
      surroundings += input[i].substr(Math.max(part.colIndex - 1, 0), part.valueLength + 2);
    }
    return symbolRegex.test(surroundings);
  };

  return numbers.filter(hasAdjacentSymbol).reduce((sum, part) => sum + part.value, 0);
};

const part2 = () => {
  const gears = input.reduce((result, row, rowIndex) => {
    while ((match = gearRegex.exec(row))) {
      result.push({
        rowIndex,
        colIndex: match.index,
      });
    }
    return result;
  }, []);

  const gearRatios = gears.map((gear) => {
    const surroundingNumbers = numbers.filter((num) => {
      const isAdjacentRow = num.rowIndex >= gear.rowIndex - 1 && num.rowIndex <= gear.rowIndex + 1;
      const isAdjacentCol = num.colIndexes.some(
        (numColIndex) => numColIndex >= gear.colIndex - 1 && numColIndex <= gear.colIndex + 1
      );
      return isAdjacentRow && isAdjacentCol;
    });

    if (surroundingNumbers.length < 2) return 0;

    return surroundingNumbers.reduce((result, number) => result * number.value, 1);
  });

  return sum(gearRatios);
};

console.log("#1:", part1()); // 525181
console.log("#2:", part2()); // 84289137
