const { getInput, range } = require("../../utils");
const commands = getInput(true).map(x => x.split(" "));

const day12 = registers => {
  let pos = 0;

  const val = x => (/\d+/.test(x) ? parseInt(x, 10) : registers[x]);
  const cpy = (source, target) => (registers[target] = val(source));
  const inc = register => registers[register]++;
  const dec = register => registers[register]--;

  const execute = cmd => {
    switch (cmd[0]) {
      case "cpy":
        return cpy(cmd[1], cmd[2]);
      case "inc":
        return inc(cmd[1]);
      case "dec":
        return dec(cmd[1]);
    }
  };

  while (pos >= 0 && pos < commands.length) {
    const cmd = commands[pos];
    execute(cmd);
    pos += cmd[0] === "jnz" && val(cmd[1]) ? parseInt(cmd[2], 10) : 1;
  }
  return registers.a;
};

console.log("#1:", day12({ a: 0, b: 0, c: 0, d: 0 }));
console.log("#2:", day12({ a: 0, b: 0, c: 1, d: 0 }));
