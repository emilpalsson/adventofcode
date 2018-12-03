const { getInput, range } = require("../../utils");
const input = getInput(true);

const parseClaimPattern = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
const parseClaim = row => {
  const parsed = parseClaimPattern.exec(row).map(x => parseInt(x));
  return {
    id: parsed[1],
    x: parsed[2],
    y: parsed[3],
    width: parsed[4],
    height: parsed[5]
  };
};

const generateFabric = () => {
  const width = claims.reduce((max, x) => Math.max(x.x + x.width, max), 0);
  const height = claims.reduce((max, x) => Math.max(x.y + x.height, max), 0);
  return range(height).map(x => range(width).map(x => ({ claims: [] })));
};

const addClaim = claim => {
  for (let x = claim.x; x < claim.x + claim.width; x++) {
    for (let y = claim.y; y < claim.y + claim.height; y++) {
      fabric[y][x].claims.push(claim.id);
    }
  }
};

const countOverlaps = () => {
  let overlaps = 0;
  fabric.forEach(row => {
    row.forEach(col => {
      if (col.claims.length > 1) {
        overlaps++;
      }
    });
  });
  return overlaps;
};

const findAvailableClaim = () => {
  const overlappingClaimIds = new Set();

  fabric.forEach(row => {
    row
      .filter(col => col.claims.length > 1)
      .forEach(col => {
        col.claims.forEach(claimId => {
          overlappingClaimIds.add(claimId);
        });
      });
  });

  return claims.find(claim => !overlappingClaimIds.has(claim.id)).id;
};

const claims = input.map(parseClaim);
const fabric = generateFabric();
claims.forEach(claim => addClaim(claim));

console.log("#1:", countOverlaps()); // 113716
console.log("#2:", findAvailableClaim()); // 742
