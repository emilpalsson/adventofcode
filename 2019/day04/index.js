const { getInput } = require("../../utils");
const input = getInput()
  .split("-")
  .map(Number);

const [from, to] = input;

const regex = /11|22|33|44|55|66|77|88|99|00/;

let combinations = 0;
for (let i = from; i <= to; i++) {
  if (!regex.test(i.toString())) {
    continue;
  }
  if (
    Number(i.toString()[1]) < Number(i.toString()[0]) ||
    Number(i.toString()[2]) < Number(i.toString()[1]) ||
    Number(i.toString()[3]) < Number(i.toString()[2]) ||
    Number(i.toString()[4]) < Number(i.toString()[3]) ||
    Number(i.toString()[5]) < Number(i.toString()[4])
  ) {
    continue;
  }
  combinations++;
}

combinations;
