const { getInput } = require("../../utils");
const input = getInput(true);

const board = input.map(row => row.split(""));
const boardWidth = board[0].length;
let carts = [];
let firstCollision;

const findCarts = () => {
  const cartRegex = /[<>^v]/;
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (cartRegex.test(col)) {
        carts.push({
          x: colIndex,
          y: rowIndex,
          direction: col,
          nextIntersection: "L"
        });
        row[colIndex] = /[<>]/.test(col) ? "-" : "|";
      }
    });
  });
};

const cartSorter = (a, b) => a.y * boardWidth + a.x > b.y * boardWidth + b.x;

const rightTurn = {
  ">": "v",
  v: "<",
  "<": "^",
  "^": ">"
};

const leftTurn = {
  ">": "^",
  "^": "<",
  "<": "v",
  v: ">"
};

const move = cart => {
  if (cart.direction === ">") {
    cart.x++;
    if (board[cart.y][cart.x] === "\\") {
      cart.direction = "v";
    } else if (board[cart.y][cart.x] === "/") {
      cart.direction = "^";
    }
  } else if (cart.direction === "<") {
    cart.x--;
    if (board[cart.y][cart.x] === "\\") {
      cart.direction = "^";
    } else if (board[cart.y][cart.x] === "/") {
      cart.direction = "v";
    }
  } else if (cart.direction === "v") {
    cart.y++;
    if (board[cart.y][cart.x] === "\\") {
      cart.direction = ">";
    } else if (board[cart.y][cart.x] === "/") {
      cart.direction = "<";
    }
  } else if (cart.direction === "^") {
    cart.y--;
    if (board[cart.y][cart.x] === "\\") {
      cart.direction = "<";
    } else if (board[cart.y][cart.x] === "/") {
      cart.direction = ">";
    }
  }
};

const checkCollision = cart => {
  if (carts.filter(c => c.x === cart.x && c.y === cart.y).length > 1) {
    if (!firstCollision) {
      firstCollision = `${cart.x},${cart.y}`;
    }
    carts = carts.filter(c => c.x !== cart.x || c.y !== cart.y);
  }
};

const turnIfIntersection = cart => {
  if (board[cart.y][cart.x] === "+") {
    if (cart.nextIntersection === "S") {
      cart.nextIntersection = "R";
    } else if (cart.nextIntersection === "R") {
      cart.direction = rightTurn[cart.direction];
      cart.nextIntersection = "L";
    } else if (cart.nextIntersection === "L") {
      cart.direction = leftTurn[cart.direction];
      cart.nextIntersection = "S";
    }
  }
};

const tick = () => {
  carts.sort(cartSorter);
  carts.forEach(cart => {
    move(cart);
    checkCollision(cart);
    turnIfIntersection(cart);
  });
};

// const printBoard = () => {
//   console.log(
//     board
//       .map((row, y) =>
//         row
//           .map((col, x) => {
//             const cart = carts.find(c => c.x === x && c.y === y);
//             return cart ? cart.direction : col;
//           })
//           .join("")
//       )
//       .join("\n")
//   );
// };

findCarts();
while (carts.length > 1) {
  tick();
}
const lastStanding = `${carts[0].x},${carts[0].y}`;

console.log("#1:", firstCollision); // 119,41
console.log("#2:", lastStanding); // 45,136
