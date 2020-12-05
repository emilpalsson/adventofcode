const { getInput } = require("../../utils");
const input = getInput(true, false);

const passports = [];

const parse = () => {
  let passport = {};
  input.forEach((line) => {
    if (line.trim() === "") {
      passports.push(passport);
      passport = {};
    } else {
      line.split(" ").forEach((param) => {
        const [attr, value] = param.split(":");
        passport[attr] = value;
      });
    }
  });
  passports.push(passport);
};
parse();
// passports;

const part1 = () => {
  const validPassports = passports.filter((passport) => {
    if (!passport.hasOwnProperty("byr")) return false;
    if (!passport.hasOwnProperty("iyr")) return false;
    if (!passport.hasOwnProperty("eyr")) return false;
    if (!passport.hasOwnProperty("hgt")) return false;
    if (!passport.hasOwnProperty("hcl")) return false;
    if (!passport.hasOwnProperty("ecl")) return false;
    if (!passport.hasOwnProperty("pid")) return false;
    return true;
  });
  console.log(validPassports);
  return validPassports;
};

const part2 = () => {
  const validPassports = part1().filter((passport) => {
    if (parseInt(passport.byr, 10) < 1920 || parseInt(passport.byr, 10) > 2002) return false;
    if (parseInt(passport.iyr, 10) < 2010 || parseInt(passport.iyr, 10) > 2020) return false;
    if (parseInt(passport.eyr, 10) < 2020 || parseInt(passport.eyr, 10) > 2030) return false;
    if (passport.hgt && passport.hgt.endsWith("cm")) {
      const hgt = parseInt(passport.hgt.replace("cm", ""), 10);
      if (hgt < 150 || hgt > 193) return false;
    } else if (passport.hgt && passport.hgt.endsWith("in")) {
      const hgt = parseInt(passport.hgt.replace("in", ""), 10);
      if (hgt < 59 || hgt > 76) return false;
    } else {
      return false;
    }
    if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) return false;
    if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(passport.ecl)) return false;
    if (!/^[0-9]{9}$/.test(passport.pid)) return false;
    return true;
  });
  console.log(validPassports);
  return validPassports.length;
};

// console.log("#1:", part1()); // 252 INTE 229
console.log("#2:", part2()); // INTE 165
