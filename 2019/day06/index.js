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
console.log(allObj);

const countParents = id => {
  let orbitsAround = input.find(x => x[1] === id);
  let count = 0;
  while (orbitsAround) {
    count++;
    id = orbitsAround[0];
    orbitsAround = input.find(x => x[1] === id);
  }
  return count;
};

// console.log(countParents("C"));
// return;

let totalCount = 0;
allObj.forEach(id => {
  const parents = countParents(id);
  totalCount += parents;
  console.log(id, parents);
});
totalCount;

// console.log("#1:", run(1)); // 7265618
// console.log("#2:", run(5)); // 7731427
