const { getInput, range, sum } = require("../../utils");
const input = getInput()
  .split(" ")
  .map(x => parseInt(x));

let pos = 0;
let metadataEntriesSum = 0;

const readMetadata = () => {
  const metadata = input[pos++];
  metadataEntriesSum += metadata;
  return metadata;
};

const processNode = () => {
  const childNodeCount = input[pos++];
  const metadataEntryCount = input[pos++];

  const childNodeValues = range(childNodeCount).map(() => processNode());
  const metadataEntries = range(metadataEntryCount).map(() => readMetadata());

  if (childNodeCount === 0) {
    return sum(metadataEntries);
  }
  return sum(metadataEntries.map(i => childNodeValues[i - 1]).filter(Number));
};

const rootNodeValue = processNode();

console.log("#1:", metadataEntriesSum); // 41521
console.log("#2:", rootNodeValue); // 19990
