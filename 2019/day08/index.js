const { getInput } = require("../../utils");
const input = getInput();

const IMAGE_WIDTH = 25;
const IMAGE_HEIGHT = 6;
const COLOR = {
  BLACK: 0,
  WHITE: 1,
  TRANSPARENT: 2
};

const layerSize = IMAGE_WIDTH * IMAGE_HEIGHT;

const chop = (str, chunkSize) => {
  const chunkCount = str.length / chunkSize;
  const chunks = [];
  for (let i = 0; i < chunkCount; i++) {
    chunks.push(str.substr(i * chunkSize, chunkSize));
  }
  return chunks;
};

const layers = chop(input, layerSize);

const part1 = () => {
  const getDigitCount = (str, digit) =>
    (str.match(new RegExp(digit, "g")) || []).length;

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
};

const part2 = () => {
  layers.reverse();

  const finalPixels = layers[0].split("").map(Number);

  layers.forEach(layer => {
    layer
      .split("")
      .map(Number)
      .forEach((pixel, index) => {
        if (pixel === COLOR.BLACK || pixel === COLOR.WHITE) {
          finalPixels[index] = pixel;
        }
      });
  });

  const finalRows = chop(finalPixels.join(""), IMAGE_WIDTH);
  const image = finalRows
    .map(row => row.replace(new RegExp(COLOR.BLACK, "g"), " "))
    .join("\n");
  console.log(image);
};

part2();

// console.log("#1:", part1());
// console.log("#2:", part2());
