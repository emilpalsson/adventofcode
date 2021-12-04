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
          .map((number) => ({ number }))
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

const hasBingo = (board) => board.scoreLines.some((line) => line.every((box) => box.marked));

const countUnmarked = (board) =>
  board.rows.reduce((sum, row) => {
    row.filter((b) => !b.marked).forEach((b) => (sum += b.number));
    return sum;
  }, 0);

const runUntilNextBingo = (boards, numbers) => {
  while (true) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];

      board.rows.forEach((row) => {
        row.filter((box) => box.number === numbers[0]).forEach((box) => (box.marked = true));
      });

      if (hasBingo(board)) {
        return { winner: board, winnerIndex: i, number: numbers[0] };
      }
    }

    numbers.shift();
  }
};

const part1 = () => {
  const { numbers, boards } = parseInput();
  const { winner, number } = runUntilNextBingo(boards, numbers);
  return countUnmarked(winner) * number;
};

const part2 = () => {
  const { numbers, boards } = parseInput();

  while (true) {
    const { winner, winnerIndex, number } = runUntilNextBingo(boards, numbers);
    if (boards.length === 1) {
      return countUnmarked(winner) * number;
    } else {
      boards.splice(winnerIndex, 1);
    }
  }
};

console.log("#1:", part1()); // 50008
console.log("#2:", part2()); // 17408
