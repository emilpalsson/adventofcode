var { getInput } = require("./utils.js");
const rooms = getInput(4, true)
  .map(r => /([a-z-]+)-(\d+)\[(.+)]/.exec(r))
  .map(r => ({
    name: r[1],
    id: parseInt(r[2], 10),
    checksum: r[3]
  }));

const part1 = () => {
  const calcChecksum = value => {
    value = value.replace(/-/g, "");
    const letters = [];
    while (value.length > 0) {
      const letter = value[0];
      const length = value.length;
      value = value.replace(new RegExp(letter, "g"), "");
      letters.push({ letter, count: length - value.length });
    }
    letters.sort(
      (a, b) => b.count - a.count || a.letter.localeCompare(b.letter)
    );
    return letters
      .filter((l, i) => i < 5)
      .map(l => l.letter)
      .join("");
  };

  const realRooms = rooms.filter(r => r.checksum == calcChecksum(r.name));
  return realRooms.reduce((sum, room) => sum + room.id, 0);
};

const part2 = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const len = alphabet.length;
  const decrypt = (name, id) => {
    return name
      .split("")
      .map(l => (l === "-" ? " " : alphabet[(alphabet.indexOf(l) + id) % len]))
      .join("");
  };
  return rooms.find(r => decrypt(r.name, r.id).includes("north")).id;
};

console.log("#1:", part1());
console.log("#2:", part2());
