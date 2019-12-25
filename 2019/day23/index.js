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

let firstYSentToNAT;

const natPackage = { x: 0, y: 0 };

const computers = [];

const computer = networkAddress => {
  let outputState = OUTPUT_STATE.ADDRESS;
  let idling = 0;
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
      if (package.address === 255) {
        if (!firstYSentToNAT) {
          firstYSentToNAT = package.y;
          console.log("First Y sent to nat:", firstYSentToNAT);
        }
        natPackage.x = package.x;
        natPackage.y = package.y;
      } else {
        computers[package.address].send(package.x);
        computers[package.address].send(package.y);
      }
      outputState = OUTPUT_STATE.ADDRESS;
    }
  };

  const onInput = () => {
    if (receivingQueue.length === 0) {
      idling++;
      return -1;
    }
    idling = 0;

    const received = receivingQueue.shift();
    // console.log(networkAddress, "recieved", received);
    return received;
  };

  const send = message => {
    receivingQueue.push(message);
  };

  const ic = intcodeComputer({ program: input, onInput, onOutput });

  return {
    send,
    isIdling: () => idling > 1,
    step: ic.step,
    reset: () => (idling = 0)
  };
};

range(50).forEach(i => computers.push(computer(i)));
// computers.forEach(computer => {
//   console.log(computer.isIdling());
// });

const natYValues = new Set();
while (true) {
  computers.forEach(computer => {
    computer.step();
    // console.log(computer.isIdling());
  });

  const networkBusy = computers.some(c => !c.isIdling());
  if (!networkBusy) {
    console.log("network idling, sending", natPackage.x, natPackage.y);
    computers[0].send(natPackage.x);
    computers[0].send(natPackage.y);
    computers[0].reset();
    if (natYValues.has(natPackage.y)) {
      console.log("First repeating nat Y:", natPackage.y);
      break;
    }
    natYValues.add(natPackage.y);
    // break;
  }
  // console.log();
}

// console.log("#1:", answer.part1); // 258
// console.log("#2:", answer.part2); // 372
