const { getInput } = require("../../utils");
const input = getInput()
  .split("-")
  .map(Number);

const [from, to] = input;

let combinations = 0;
for (let i = from; i <= to; i++) {
  if (
    !(
      (i.toString().includes("11") && !i.toString().includes("111")) ||
      (i.toString().includes("22") && !i.toString().includes("222")) ||
      (i.toString().includes("33") && !i.toString().includes("333")) ||
      (i.toString().includes("44") && !i.toString().includes("444")) ||
      (i.toString().includes("55") && !i.toString().includes("555")) ||
      (i.toString().includes("66") && !i.toString().includes("666")) ||
      (i.toString().includes("77") && !i.toString().includes("777")) ||
      (i.toString().includes("88") && !i.toString().includes("888")) ||
      (i.toString().includes("99") && !i.toString().includes("999"))
    )
  ) {
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

combinations; // 511, 316
