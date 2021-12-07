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
  };

  for (let i = 0; i < 80; i++) tick();
  return fishList.length;
};

const part2 = () => {
  const fishCountBySpawnTimer = [];

  for (let i = 0; i < 9; i++) {
    fishCountBySpawnTimer[i] = input.filter((x) => x === i).length;
  }

  const tick = () => {
    const fishReadyToSpawn = fishCountBySpawnTimer.shift();
    fishCountBySpawnTimer[6] += fishReadyToSpawn;
    fishCountBySpawnTimer[8] = fishReadyToSpawn;
  };

  for (let i = 0; i < 256; i++) tick();

  return fishCountBySpawnTimer.reduce((sum, curr) => sum + curr, 0);
};

console.log("#1:", part1()); // 353274
console.log("#2:", part2()); // 1609314870967
