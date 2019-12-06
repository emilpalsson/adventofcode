const { getInput } = require("../../utils");
const input = getInput(true).map(x => x.split(")"));

const map = input.reduce((acc, curr) => {
  acc[curr[0]] = curr[1];
  return acc;
}, {});

input;
// map;

const allObj = new Set();
input.forEach(x => {
  // console.log(x[1]);
  allObj.add(x[1]);
});
// console.log(allObj);

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

const yourParents = getParents("YOU");
const targetParents = getParents("SAN");
// console.log(yourParents);
// console.log(targetParents);

for (let i = 0; i < yourParents.length; i++) {
  const isCommonParent = targetParents.includes(yourParents[i]);
  if (isCommonParent) {
    const targetDistance = targetParents.indexOf(yourParents[i]);
    const youDistance = i;
    console.log(targetDistance + youDistance);
    break;
  }
}
return;

let totalCount = 0;
allObj.forEach(id => {
  const parents = getParents(id);
  totalCount += parents;
  console.log(id, parents);
});
totalCount;

// console.log("#1:", run(1)); // 7265618
// console.log("#2:", run(5)); // 7731427
