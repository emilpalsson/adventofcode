const { getInput } = require("../../utils");
const input = getInput();

const layerSize = 25 * 6;
const layerCount = input.length / layerSize;

const layers = [];
for (let i = 0; i < layerCount; i++) {
  layers.push(input.substr(i * layerSize, layerSize));
}

const getDigitCount = (str, digit) => str.match(new RegExp(digit, "g")).length;

let layerWithFewest0;
let layerWithFewest0Count = Infinity;
layers.forEach(layer => {
  const layer0Count = getDigitCount(layer, 0);
  if (layer0Count < layerWithFewest0Count) {
    layerWithFewest0Count = layer0Count;
    layerWithFewest0 = layer;
  }
});

const oneCount = getDigitCount(layerWithFewest0, 1);
const twoCount = getDigitCount(layerWithFewest0, 2);

console.log(oneCount * twoCount); // 2520

// console.log("#1:", part1());
// console.log("#2:", part2());
