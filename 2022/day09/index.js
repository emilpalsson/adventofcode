const { getInput } = require("../../utils");
const input = getInput(true).map((x) => {
  const split = x.split(" ");
  return { direction: split[0], steps: Number(split[1]) };
});

const posId = ({ x, y }) => `${x};${y}`;

const run = (ropeLength) => {
  const knots = [];
  for (let i = 0; i < ropeLength; i++) knots.push({ x: 0, y: 0 });
  const head = knots[0];
  const tail = knots.at(-1);
  const tailVisits = new Set([posId(tail)]);

  const moveKnotVertically = (knot, step, parentX) => {
    knot.y += step;
    if (parentX > knot.x) knot.x++;
    if (parentX < knot.x) knot.x--;
  };
  const moveKnotHorizontally = (knot, step, parentY) => {
    knot.x += step;
    if (parentY > knot.y) knot.y++;
    if (parentY < knot.y) knot.y--;
  };

  input.forEach((operation) => {
    for (let s = 0; s < operation.steps; s++) {
      // prettier-ignore
      switch (operation.direction) {
        case 'U': head.y--; break;
        case 'R': head.x++; break;
        case 'D': head.y++; break;
        case 'L': head.x--; break;
        default: throw new Error("wtf direction", direction);
      }

      for (let i = 1; i < knots.length; i++) {
        const knot = knots[i];
        const parentKnot = knots[i - 1];
        if (knot.x < parentKnot.x - 1) moveKnotHorizontally(knot, 1, parentKnot.y);
        if (knot.x > parentKnot.x + 1) moveKnotHorizontally(knot, -1, parentKnot.y);
        if (knot.y < parentKnot.y - 1) moveKnotVertically(knot, 1, parentKnot.x);
        if (knot.y > parentKnot.y + 1) moveKnotVertically(knot, -1, parentKnot.x);
      }
      tailVisits.add(posId(tail));
    }
  });

  return tailVisits.size;
};

console.log("#1:", run(2)); // 6391
console.log("#2:", run(10)); // 2593
