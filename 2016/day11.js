const input = `The first floor contains a promethium generator and a promethium-compatible microchip.
The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.
The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.
The fourth floor contains nothing relevant.`.split("\n");

const convertInputToLayout = () => {
  const result = input.map(x => []);
  let combinations = 0;
  input
    .map(floor => floor.match(/[^ ]+ generator/g))
    .forEach((generators, floorIndex) => {
      if (generators) {
        generators.forEach(generator => {
          const chipFloor = input.findIndex(f =>
            f.includes(generator.split(" ")[0] + "-compatible")
          );
          result[floorIndex].push(`G${combinations}`);
          result[chipFloor].push(`C${combinations++}`);
        });
      }
    });
  return { floors: result, combinationCount: combinations };
};

let { combinationCount, floors } = convertInputToLayout();

const part2Layout = floors.map(floor => floor.slice());
part2Layout[0].push("G5", "C5", "G6", "C6");

const range = size => [...Array(size).keys()];

// const combinationCount = 5;
// let floors = [
//   ["G0", "C0"],
//   ["G1", "G2", "G3", "G4"],
//   ["C1", "C2", "C3", "C4"],
//   []
// ];
// const combinationCount = 7;
// let floors = [
//   ["G0", "C0", "G5", "C5", "G6", "C6"],
//   ["G1", "G2", "G3", "G4"],
//   ["C1", "C2", "C3", "C4"],
//   []
// ];
let pos = 0;
let seen = {};

// Finds the location (floor) of passed item in passed layout
const findItem = (layout, type, id) =>
  layout.findIndex(f => f.includes(type + id));

// Convert passed layout to "state format" that tracks the possition of pairs and elevator, but ignores which pairs are where
const getState = (position, layout) =>
  position +
  range(combinationCount)
    .map(id => `${findItem(layout, "G", id)}${findItem(layout, "C", id)}`)
    .sort()
    .join("");
let solvedState = "3" + "33".repeat(combinationCount); // Everything at top floor

// Get all two item combinations from the current floor
const allPairs = () => {
  const floor = floors[pos];
  const pairs = [];
  for (let i = 0; i < floor.length - 1; i++) {
    for (let j = i + 1; j < floor.length; j++) {
      pairs.push([floor[i], floor[j]]);
    }
  }
  return pairs;
};

// Copies an array but excludes items in itemsToRemove
const remove = (arr, itemsToRemove) => {
  const returnArr = arr.slice();
  itemsToRemove.forEach(item => {
    returnArr.splice(returnArr.indexOf(item), 1);
  });
  return returnArr;
};

// Check if passed items can coexist without any chips getting fried
const isValid = items =>
  !items.some(i => i.startsWith("G")) || // Has no generator
  !items.some(i => i.startsWith("C") && !items.includes("G" + i.substr(1))); // Or all chips has compatible generator

// Checks so the move wont fry any chips, and if so returnes the layout after the move
const isValidMove = (items, toFloor) => {
  const currentFloor = remove(floors[pos], items);
  if (!isValid(currentFloor)) return false;
  const otherFloor = floors[toFloor].concat(items);
  if (!isValid(otherFloor)) return false;

  const nextLayout = floors.slice();
  nextLayout.splice(pos, 1, currentFloor);
  nextLayout.splice(toFloor, 1, otherFloor);
  return nextLayout;
};

// Finds all possible next layouts (position of items after next move)
const getNextLayouts = moves => {
  // Find possible moves upstairs
  const up = [];
  if (pos < 3) {
    up.push(
      ...allPairs()
        .map(p => isValidMove(p, pos + 1))
        .filter(p => p)
    );
    if (up.length === 0) {
      up.push(
        ...floors[pos].map(i => isValidMove([i], pos + 1)).filter(p => p)
      );
    }
  }

  // Find possible moves downstairs
  const down = [];
  if (pos > 0 && floors[pos - 1].length > 0) {
    down.push(
      ...floors[pos].map(i => isValidMove([i], pos - 1)).filter(p => p)
    );
    if (down.length === 0) {
      down.push(
        ...allPairs()
          .map(p => isValidMove(p, pos - 1))
          .filter(p => p)
      );
    }
  }

  // Filter out already seen states (after fewer moves)
  const layoutsToTry = [];
  up.forEach(layout => {
    const state = getState(pos + 1, layout);
    if (!seen[state] || seen[state] > moves) {
      layoutsToTry.push({ position: pos + 1, layout, state });
      seen[state] = moves;
    }
  });
  down.forEach(layout => {
    const state = getState(pos - 1, layout);
    if (!seen[state] || seen[state] > moves) {
      layoutsToTry.push({ position: pos - 1, layout, state });
      seen[state] = moves;
    }
  });
  return layoutsToTry;
};

const solve = (moves = 0) => {
  const nextLayouts = getNextLayouts(moves);
  moves++;
  if (moves < shortestSolution) {
    nextLayouts.forEach(layout => {
      if (layout.state === solvedState) {
        shortestSolution = moves;
        return;
      }
      floors = layout.layout;
      pos = layout.position;
      solve(moves);
    });
  }
};

let shortestSolution = 99999;
solve();
console.log("#1:", shortestSolution);

floors = part2Layout;
seen = {};
pos = 0;
combinationCount += 2;
solvedState = "3" + "33".repeat(combinationCount);
shortestSolution = 99999;
solve();
console.log("#2:", shortestSolution);
