const { getInput } = require("../../utils");
const input = getInput(false).split(",").map(Number);

const part1 = () => {
  const fishList = input.slice();

  const tick = () => {
    const fishCount = fishList.length;

    for (let i = 0; i < fishCount; i++) {
      let nextAge = fishList[i] - 1;
      if (nextAge === -1) {
        nextAge = 6;
        fishList.push(8);
      }
      fishList[i] = nextAge;
    }

    // console.log(fishList.join(","));
  };

  for (let i = 0; i < 80; i++) tick();

  return fishList.length;
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 353274
// console.log("#2:", part2());
