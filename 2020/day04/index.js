const { getInput } = require("../../utils");
const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const input = getInput()
  .replace(/\r/g, "")
  .split("\n\n")
  .map((str) =>
    str.split(/\s/).reduce((passport, param) => {
      const [key, value] = param.split(":");
      passport[key] = value;
      return passport;
    }, {})
  )
  .filter((passport) => {
    return !requiredProps.some((prop) => !passport.hasOwnProperty(prop));
  });

const isBetweenInclusive = (value, min, max) => value >= min && value <= max;

const part1 = () => input.length;

const part2 = () => {
  const validPassports = input.filter((passport) => {
    if (!isBetweenInclusive(parseInt(passport.byr, 10), 1920, 2002)) return false;
    if (!isBetweenInclusive(parseInt(passport.iyr, 10), 2010, 2020)) return false;
    if (!isBetweenInclusive(parseInt(passport.eyr, 10), 2020, 2030)) return false;

    if (passport.hgt.endsWith("cm")) {
      if (!isBetweenInclusive(parseInt(passport.hgt, 10), 150, 193)) return false;
    } else if (passport.hgt && passport.hgt.endsWith("in")) {
      if (!isBetweenInclusive(parseInt(passport.hgt, 10), 59, 76)) return false;
    } else {
      return false;
    }

    if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(passport.ecl)) return false;
    if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) return false;
    if (!/^[0-9]{9}$/.test(passport.pid)) return false;
    return true;
  });
  return validPassports.length;
};

console.log("#1:", part1()); // 230
console.log("#2:", part2()); // 156
