var md5 = require("md5");
var { getInput } = require("../utils");
const salt = getInput(14);

const day14 = enableKeyStretching => {
  const hashes = [];
  let keysFound = 0;
  let index = -1;

  const getTriplet = hash => {
    for (let i = 0; i < hash.length - 2; i++) {
      if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
        return hash[i];
      }
    }
  };

  const hasMatchingQuintuplet = char => {
    const searchStr = char.repeat(5);
    for (let i = index + 1; i <= index + 1000; i++) {
      if (getHash(i).includes(searchStr)) {
        return true;
      }
    }
    return false;
  };

  const getHash = index => {
    if (!hashes[index]) {
      hashes[index] = md5(`${salt}${index}`);
      if (enableKeyStretching) {
        for (let i = 0; i < 2016; i++) {
          hashes[index] = md5(hashes[index]);
        }
      }
    }
    return hashes[index];
  };

  while (keysFound < 64) {
    index++;
    const hash = getHash(index);
    const triplet = getTriplet(hash);
    if (triplet && hasMatchingQuintuplet(triplet)) {
      keysFound++;
    }
  }
  return index;
};

console.log("#1:", day14(false));
console.log("#2:", day14(true));
