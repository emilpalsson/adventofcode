const { getInput, range } = require("../../utils");
const { intcodeComputer } = require("./intcode-computer");
const input = getInput()
  .split(",")
  .map(Number);

const OUTPUT_STATE = {
  ADDRESS: 0,
  X: 1,
  Y: 2
};

const computers = [];

const computer = networkAddress => {
  let outputState = OUTPUT_STATE.ADDRESS;
  const package = {
    address: null,
    x: null,
    y: null
  };

  const receivingQueue = [networkAddress];

  const onOutput = output => {
    if (outputState === OUTPUT_STATE.ADDRESS) {
      package.address = output;
      outputState = OUTPUT_STATE.X;
    } else if (outputState === OUTPUT_STATE.X) {
      package.x = output;
      outputState = OUTPUT_STATE.Y;
    } else if (outputState === OUTPUT_STATE.Y) {
      package.y = output;
      console.log(
        `${networkAddress} sends (${package.x}, ${package.y}) to ${package.address}`
      );
      computers[package.address].send(package.x);
      computers[package.address].send(package.y);
      outputState = OUTPUT_STATE.ADDRESS;
    }
  };

  const onInput = () => {
    if (receivingQueue.length === 0) return -1;

    const received = receivingQueue.shift();
    console.log(networkAddress, "recieved", received);
    return received;
  };

  const send = message => {
    receivingQueue.push(message);
  };

  const ic = intcodeComputer({ program: input, onInput, onOutput });

  return {
    send,
    step: ic.step
  };
};

range(50).forEach(i => computers.push(computer(i)));

while (true) {
  computers.forEach(computer => {
    computer.step();
  });
}

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
