const { getInput } = require("../../utils");
const input = getInput();

const part1 = () => {
  const values = input.split("").map(Number);
  const pattern = [0, 1, 0, -1];

  const fft = () => {
    for (let i = 0; i < values.length; i++) {
      let newValue = 0;
      values.forEach((value, i2) => {
        const multiplier =
          pattern[Math.floor((i2 + 1) / (i + 1)) % pattern.length];
        newValue += value * multiplier;
      });
      values[i] = Math.abs(newValue) % 10;
    }
  };

  for (let i = 0; i < 100; i++) {
    fft();
  }

  return values.join("").substr(0, 8);
};

const part2 = () => {
  const offset = Number(input.substr(0, 7));
  const values = input
    .repeat(10000)
    .split("")
    .map(Number);

  const fft = () => {
    let sum = 0;
    for (let i = values.length - 1; i >= offset; i--) {
      sum += values[i];
      values[i] = sum % 10;
    }
  };

  for (let i = 0; i < 100; i++) {
    fft();
  }

  return values.slice(offset, offset + 8).join("");
};

console.log("#1:", part1()); // 42205986
console.log("#2:", part2()); // 13270205
