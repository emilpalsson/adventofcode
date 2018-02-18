const getId = cords => `${cords[0]}x${cords[1]}`;

const getHeuristicDistance = (from, to) =>
  Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);

const NodeModel = (
  cords,
  costSoFar = Infinity,
  minimumTotalCost = Infinity
) => ({
  id: getId(cords),
  cords,
  cameFrom: null,
  costSoFar,
  minimumTotalCost,
  closed: false
});

const astar = (start, goal, getNeighbors) => {
  const nodes = {};
  nodes[getId(start)] = NodeModel(start, 0, getHeuristicDistance(start, goal));
  const openSet = [getId(start)];
  const goalId = getId(goal);

  // Find the node with minimum minimumTotalCost and set to current (to try it next)
  let current;
  const setNextCurrent = () => {
    const sorted = openSet
      .map(id => ({ id, minimumTotalCost: nodes[id].minimumTotalCost }))
      .sort((a, b) => a.minimumTotalCost - b.minimumTotalCost);
    if (sorted.length > 0) {
      current = nodes[sorted[0].id];
      return true;
    }
    return false;
  };

  while (setNextCurrent()) {
    // Solution found?
    if (current.id === goalId) {
      return current.costSoFar;
      break;
    }

    // Remove current node from openSet and set to closed
    openSet.splice(openSet.indexOf(current.id), 1);
    nodes[current.id].closed = true;

    const neighbors = getNeighbors(current.cords).map(n => NodeModel(n));
    neighbors.forEach(neighbor => {
      if (!nodes[neighbor.id]) {
        // New node found, add to node list and openSet
        nodes[neighbor.id] = neighbor;
        openSet.push(neighbor.id);
      } else if (nodes[neighbor.id].closed) {
        // Node already closed, continue
        return;
      }

      // Ignore path if not better than previously found
      const costSoFar = nodes[current.id].costSoFar + 1;
      if (costSoFar >= nodes[neighbor.id].costSoFar) {
        return;
      }

      // Best path found to neighbor so far, save it
      nodes[neighbor.id].cameFrom = current.id;
      nodes[neighbor.id].costSoFar = costSoFar;
      nodes[neighbor.id].minimumTotalCost =
        costSoFar + getHeuristicDistance(nodes[neighbor.id].cords, goal);
    });
  }

  // Unsolvable
  return false;
};

module.exports = { astar };
