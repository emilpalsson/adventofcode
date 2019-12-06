const { getInput } = require("../../utils");
const input = getInput(true).map(x => x.split(")"));

const allObj = new Set();
input.forEach(x => allObj.add(x[1]));

const getParents = id => {
  let orbitsAround = input.find(x => x[1] === id);
  const parents = [];
  while (orbitsAround) {
    id = orbitsAround[0];
    parents.push(id);
    orbitsAround = input.find(x => x[1] === id);
  }
  return parents;
};

const part1 = () => {
  let totalCount = 0;
  allObj.forEach(id => {
    const parents = getParents(id);
    totalCount += parents.length;
  });
  return totalCount;
};

const part2 = () => {
  const yourParents = getParents("YOU");
  const targetParents = getParents("SAN");

  for (let i = 0; i < yourParents.length; i++) {
    const isCommonParent = targetParents.includes(yourParents[i]);
    if (isCommonParent) {
      const targetDistance = targetParents.indexOf(yourParents[i]);
      const youDistance = i;
      return targetDistance + youDistance;
    }
  }
};

console.log("#1:", part1()); // 7265618
console.log("#2:", part2()); // 7731427
