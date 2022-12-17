const { getInput, multiply } = require("../../utils");
const input = getInput(true).map((x) => x.split("").map(Number));

const getTreeLineUp = (treeX, treeY) => {
  let line = [];
  for (let y = treeY - 1; y >= 0; y--) {
    line.push(input[y][treeX]);
  }
  return line;
};

const getTreeLineDown = (treeX, treeY) => {
  let line = [];
  for (let y = treeY + 1; y < input.length; y++) {
    line.push(input[y][treeX]);
  }
  return line;
};

const getTreeLineLeft = (treeX, treeY) => {
  let line = [];
  for (let x = treeX - 1; x >= 0; x--) {
    line.push(input[treeY][x]);
  }
  return line;
};

const getTreeLineRight = (treeX, treeY) => {
  let line = [];
  for (let x = treeX + 1; x < input[treeY].length; x++) {
    line.push(input[treeY][x]);
  }
  return line;
};

const isVisible = (height, x, y) => {
  if (getTreeLineUp(x, y).every((h) => h < height)) return true;
  if (getTreeLineRight(x, y).every((h) => h < height)) return true;
  if (getTreeLineDown(x, y).every((h) => h < height)) return true;
  if (getTreeLineLeft(x, y).every((h) => h < height)) return true;
  return false;
};

const countVisibleTrees = (line, maxHeight) => {
  let visibleTreeCount = 0;
  for (tree of line) {
    visibleTreeCount++;
    if (tree >= maxHeight) break;
  }
  return visibleTreeCount;
};

const getScenicScore = (height, x, y) => {
  let visibleTreeCountPerDirection = [];

  visibleTreeCountPerDirection.push(countVisibleTrees(getTreeLineUp(x, y), height));
  visibleTreeCountPerDirection.push(countVisibleTrees(getTreeLineRight(x, y), height));
  visibleTreeCountPerDirection.push(countVisibleTrees(getTreeLineDown(x, y), height));
  visibleTreeCountPerDirection.push(countVisibleTrees(getTreeLineLeft(x, y), height));

  return multiply(visibleTreeCountPerDirection);
};

const part1 = () => {
  let visibleTreeCount = 0;

  input.forEach((line, y) => {
    line.forEach((tree, x) => {
      if (isVisible(tree, x, y)) {
        visibleTreeCount++;
      }
    });
  });

  return visibleTreeCount;
};

const part2 = () => {
  let highestScenicScore = 0;

  input.forEach((line, y) => {
    line.forEach((tree, x) => {
      const scenicScore = getScenicScore(tree, x, y);
      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    });
  });

  return highestScenicScore;
};

console.log("#1:", part1()); // 1695
console.log("#2:", part2()); // 287040
