const { getInput } = require("../../utils");
const input = getInput().replace(/\r/g, "");

const part1 = () => {
  const getEdgeVariations = (rows) => {
    const top = rows[0];
    const right = rows.map((x) => x[x.length - 1]).join("");
    const bottom = rows[rows.length - 1];
    const left = rows.map((x) => x[0]).join("");
    return [
      top,
      top.split("").reverse().join(""),
      right,
      right.split("").reverse().join(""),
      bottom,
      bottom.split("").reverse().join(""),
      left,
      left.split("").reverse().join(""),
    ];
  };

  const countAdjacentTiles = (tile) => {
    return tiles.filter((otherTile) => {
      if (otherTile === tile) return false;
      return otherTile.edgeVariations.some((x) => tile.edgeVariations.includes(x));
    }).length;
  };

  const tiles = input.split("\n\n").map((section) => {
    const rows = section.split("\n");
    let id = Number(rows.shift().split(/[ :]/)[1]);
    return {
      id,
      rows,
      edgeVariations: getEdgeVariations(rows),
    };
  });

  tiles.forEach((tile) => {
    tile.adjacentTileCount = countAdjacentTiles(tile);
  });

  return tiles
    .filter((tile) => tile.adjacentTileCount === 2)
    .reduce((sum, tile) => sum * tile.id, 1);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 5775714912743
// console.log("#2:", part2()); //
