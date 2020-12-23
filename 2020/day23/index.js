const { getInput } = require("../../utils");
const CircularLinkedList = require("../../utils/circular-linked-list");
const input = getInput().split("").map(Number);

const part1 = () => {
  let current;

  const init = () => {
    let current = new CircularLinkedList(input[0]);
    for (let i = 1; i < input.length; i++) {
      current.insert(input[i]);
      current = current.next;
    }
    current = current.next;
    return current;
  };

  const moveTo = (label) => {
    while (current.value !== label) {
      current = current.next;
    }
  };

  const step = () => {
    // Pick up
    const pickedUp = [current.next.next.next.value, current.next.next.value, current.next.value];
    current.next.remove();
    current.next.remove();
    current.next.remove();

    // Find destination cup
    const currentLabel = current.value;
    let destinationLabel = current.value - 1 || 9;
    while (pickedUp.includes(destinationLabel)) {
      destinationLabel = destinationLabel - 1 || 9;
    }
    moveTo(destinationLabel);

    // Place picked up cups
    pickedUp.forEach((x) => current.insert(x));

    // Return to the one after current
    moveTo(currentLabel);
    current = current.next;
  };

  const main = () => {
    current = init();
    for (let i = 0; i < 100; i++) {
      step();
    }

    moveTo(1);

    let result = "";
    for (let i = 0; i < 8; i++) {
      current = current.next;
      result += current.value;
    }
    return result;
  };

  return main();

  // console.log(current.value);
  // console.log(current.next.value);
  // console.log(current.next.next.value);
  // console.log(current.next.next.next.value);
  // console.log(current.next.next.next.next.value);
  // console.log(current.next.next.next.next.next.value);
  // console.log(current.next.next.next.next.next.next.value);
  // console.log(current.next.next.next.next.next.next.next.value);
  // console.log(current.next.next.next.next.next.next.next.next.value);
  // console.log(current.next.next.next.next.next.next.next.next.next.value);
};

const part2 = () => {
  return 0;
};

console.log("#1:", part1()); // 26354798
// console.log("#2:", part2()); //
