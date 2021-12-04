const { getInput } = require("../../utils");
const input = getInput(true);

const parseInput = () => {
  const inputCopy = input.slice();
  const numbers = inputCopy.shift().split(",").map(Number);
  inputCopy.shift();

  const parseNextBoard = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(
        inputCopy
          .shift()
          .trim()
          .split(/\s+/)
          .map(Number)
          .map((n) => ({ n }))
      );
    }
    inputCopy.shift();

    const scoreLines = [...rows];
    for (let i = 0; i < 5; i++) {
      scoreLines.push([rows[0][i], rows[1][i], rows[2][i], rows[3][i], rows[4][i]]);
    }

    return { rows, scoreLines };
  };

  const boards = [];
  while (inputCopy.length > 0) {
    boards.push(parseNextBoard());
  }

  return { numbers, boards };
};

const hasBingo = (board) => board.scoreLines.some((l) => l.every((b) => b.x));

const countUnmarked = (board) =>
  board.rows.reduce((sum, row) => {
    row.filter((b) => !b.x).forEach((b) => (sum += b.n));
    return sum;
  }, 0);

const part1 = () => {
  const { numbers, boards } = parseInput();

  let numberIndex = 0;
  while (true) {
    const number = numbers[numberIndex];
    numberIndex++;

    for (let bi = 0; bi < boards.length; bi++) {
      const board = boards[bi];
      board.rows.forEach((row) => {
        row.filter((box) => box.n === number).forEach((box) => (box.x = 1));
      });

      if (hasBingo(board)) {
        return countUnmarked(board) * number;
      }
    }
  }
};

const part2 = () => {
  const { numbers, boards } = parseInput();

  let numberIndex = 0;
  while (true) {
    const number = numbers[numberIndex];
    numberIndex++;

    for (let bi = 0; bi < boards.length; bi++) {
      const board = boards[bi];
      if (board.hasBingo) continue;

      board.rows.forEach((row) => {
        row.filter((box) => box.n === number).forEach((box) => (box.x = 1));
      });

      if (hasBingo(board)) {
        board.hasBingo = true;
        if (boards.every((b) => b.hasBingo)) {
          return countUnmarked(board) * number;
        }
      }
    }
  }
};

// console.log("#1:", part1()); // 50008
console.log("#2:", part2()); // 17408
