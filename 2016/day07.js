var { getInput } = require("../utils");
const ipList = getInput(7, true);
const hypernetRegex = /\[[a-z]+\]/g;

const part1 = () => {
  const hasAbba = value => {
    for (let i = 0; i < value.length - 3; i++) {
      if (
        value[i] === value[i + 3] &&
        value[i + 1] === value[i + 2] &&
        value[i] !== value[i + 1]
      ) {
        return true;
      }
    }
    return false;
  };

  const hasTlsSupport = ip => {
    let valid = true;
    ip.match(hypernetRegex).forEach(hypernet => {
      if (hasAbba(hypernet)) {
        valid = false;
      }
    });
    if (!valid) {
      return false;
    }
    ip = ip.replace(hypernetRegex, " ");
    return hasAbba(ip);
  };

  return ipList.filter(ip => hasTlsSupport(ip)).length;
};

const part2 = () => {
  const getAbas = value => {
    const abas = [];
    for (let i = 0; i < value.length - 2; i++) {
      if (value[i] === value[i + 2] && value[i] !== value[i + 1]) {
        abas.push({ a: value[i], b: value[i + 1] });
      }
    }
    return abas;
  };

  const hasSslSupport = ip => {
    const supernet = ip.replace(hypernetRegex, " ");
    const hypernet = ip.match(hypernetRegex).join("");
    const abas = getAbas(supernet);
    return abas.some(aba => hypernet.includes(`${aba.b}${aba.a}${aba.b}`));
  };

  return ipList.filter(ip => hasSslSupport(ip)).length;
};

console.log("#1:", part1());
console.log("#2:", part2());
