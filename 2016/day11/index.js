const { getInput, range } = require("../../utils");
const input = getInput(true);

const parseInput = () => {
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
  return { layout: result, combinationCount: combinations };
};

const findShortestSolution = initialLayout => {
  let pos = 0;
  let seen = {};
  let floors = initialLayout;
  const combinationCount =
    initialLayout.reduce((sum, floor) => sum + floor.length, 0) / 2;

  // Finds the location (floor) of passed item in passed layout
  const findItem = (layout, type, id) =>
    layout.findIndex(f => f.includes(type + id));

  // Convert passed layout to "state format" that tracks the possition of pairs and the elevator, but ignores which pairs are where
  const getState = (position, layout) =>
    position +
    range(combinationCount)
      .map(id => `${findItem(layout, "G", id)}${findItem(layout, "C", id)}`)
      .sort()
      .join("");
  let solvedState = "3" + "33".repeat(combinationCount); // Everything at top floor

  // Get all two item combinations from passed array
  const pairs = items => {
    const result = [];
    for (let i = 0; i < items.length - 1; i++) {
      for (let j = i + 1; j < items.length; j++) {
        result.push([items[i], items[j]]);
      }
    }
    return result;
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
  const layoutFromMove = (items, toFloor) => {
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
        ...pairs(floors[pos])
          .map(p => layoutFromMove(p, pos + 1))
          .filter(p => p)
      );
      if (up.length === 0) {
        up.push(
          ...floors[pos].map(i => layoutFromMove([i], pos + 1)).filter(p => p)
        );
      }
    }

    // Find possible moves downstairs
    const down = [];
    if (pos > 0 && floors[pos - 1].length > 0) {
      down.push(
        ...floors[pos].map(i => layoutFromMove([i], pos - 1)).filter(p => p)
      );
      if (down.length === 0) {
        down.push(
          ...pairs(floors[pos])
            .map(p => layoutFromMove(p, pos - 1))
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

  const traverse = (moves = 0) => {
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
        traverse(moves);
      });
    }
  };

  let shortestSolution = 99999;
  traverse();
  return shortestSolution;
};

const { combinationCount, layout } = parseInput();
console.log("#1:", findShortestSolution(layout));

range(2).forEach(i =>
  layout[0].push("G" + (i + combinationCount), "C" + (i + combinationCount))
);
console.log("#2:", findShortestSolution(layout));
