const { getInput } = require("../../utils");
const input = getInput(true).map((x) => {
  const split = x.split(" ");
  return { direction: split[0], steps: Number(split[1]) };
});

const posId = ({ x, y }) => `${x};${y}`;

const part1 = () => {
  const headPos = { x: 0, y: 0 };
  const tailPos = { x: 0, y: 0 };
  const tailVisits = new Set([posId(tailPos)]);

  const moveTailVertically = (step) => {
    tailPos.y += step;
    tailPos.x = headPos.x;
  };
  const moveTailHorizontally = (step) => {
    tailPos.x += step;
    tailPos.y = headPos.y;
  };

  input.forEach((operation) => {
    for (let i = 0; i < operation.steps; i++) {
      // prettier-ignore
      switch (operation.direction) {
        case 'U': headPos.y++; break;
        case 'R': headPos.x++; break;
        case 'D': headPos.y--; break;
        case 'L': headPos.x--; break;
        default: throw new Error("wtf direction", direction);
      }

      if (tailPos.x < headPos.x - 1) moveTailHorizontally(1);
      if (tailPos.x > headPos.x + 1) moveTailHorizontally(-1);
      if (tailPos.y < headPos.y - 1) moveTailVertically(1);
      if (tailPos.y > headPos.y + 1) moveTailVertically(-1);
      tailVisits.add(posId(tailPos));
    }
  });

  return tailVisits.size;
};

const part2 = () => {};

console.log("#1:", part1()); // 6391
// console.log("#2:", part2());
