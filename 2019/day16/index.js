const { getInput, sum } = require("../../utils");
const input = getInput();
// const input = "03036732577212944063491565474664";
// const input = "12345678";
// .split("")
// .map(Number);

// offset = 5 974 901
// length = 6 500 000
const offset = Number(input.substr(0, 7));
// const offset = 0;
// offset;
const realSignal = input.repeat(10000);
// const realSignal = input.repeat(1);
// console.log(realSignal.length);
// return;

// const pattern = [0, 1, 0, -1];
// const patternLength = pattern.length;

// let values = input.slice();

const values = realSignal.split("").map(Number);

const valuesLength = values.length;
valuesLength;

// let count = 0;
const part2 = () => {
  for (let i = offset; i < valuesLength; i++) {
    // for (let i = valuesLength - 1; i >= offset; i--) {
    // count++;
    // console.log(values[i]);
    let newValue = 0;
    for (let i2 = i; i2 < valuesLength; i2++) {
      newValue += values[i2];
    }
    values[i] = newValue % 10;
    // values[i] = sum(values.slice(i)) % 10;
    // console.log(values[i]);
    // if (count === 2) {
    //   break;
    // }
  }
};

const part2b = () => {
  let sum = 0;
  for (let i = valuesLength - 1; i >= offset; i--) {
    sum += values[i];
    // let newValue = 0;
    // for (let i2 = i; i2 < valuesLength; i2++) {
    //   newValue += values[i2];
    // }
    values[i] = sum % 10;
  }
};

// part2();
for (let i = 0; i < 100; i++) {
  part2b();
  console.log(i);
}

console.log(values.slice(offset, offset + 8).join(""));
// console.log(values.join(""));

return;

// const performPhase = () => {
//   for (let i = 0; i < valuesLength; i++) {
//     let newValue = 0;
//     values.forEach((value, i2) => {
//       const multiplier =
//         pattern[Math.floor((i2 + 1) / (i + 1)) % patternLength];
//       newValue += value * multiplier;
//     });
//     values[i] = Math.abs(newValue) % 10;
//   }
// };

// let lastVal;
for (let i = 0; i < 100; i++) {
  performPhase2();
  // console.log(values.join(""));
  // val = Number(values.join(""));
  // console.log(val - lastVal);
  // lastVal = Number(values.join(""));
}
count;

const answer = values.join("").substr(0, 8);
console.log(answer, answer === "42205986"); // 42205986

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
