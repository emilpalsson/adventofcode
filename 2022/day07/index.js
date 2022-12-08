const { getInput, sum } = require("../../utils");
const input = getInput(true);

const parseChangeDirectoryCommand = (command, state) => {
  const directory = command.substring(5);
  if (directory === "..") {
    state.path.pop();
  } else if (directory === "/") {
    state.path = [];
  } else {
    state.path.push(directory);
  }
  state.pointer++;
};

const parseListCommand = (command, state) => {
  const pathStr = "/" + state.path.join("/");
  const contentObj = state.content[pathStr];
  if (!contentObj) {
    contentObj;
    state;
  }

  while (input[++state.pointer] && !input[state.pointer].startsWith("$")) {
    const item = input[state.pointer];

    if (item.startsWith("dir ")) {
      const dirName = pathStr + (pathStr === "/" ? "" : "/") + item.split(" ")[1];
      contentObj.directories.push(dirName);
      state.content[dirName] = {
        type: "directory",
        files: [],
        directories: [],
      };
    } else {
      const fileName = pathStr + (pathStr === "/" ? "" : "/") + item.split(" ")[1];
      const size = Number(item.split(" ")[0]);
      contentObj.files.push(fileName);
      state.content[pathStr + (pathStr === "/" ? "" : "/") + item.split(" ")[1]] = {
        type: "file",
        size,
      };
    }
  }
};

const calculateTotalDirectorySizes = (content) => {
  const itemEntries = Object.entries(content);
  const directoryEntries = itemEntries.filter((itemEntry) => itemEntry[1].type === "directory");

  while (!content["/"].size) {
    directoryEntries.forEach(([, directory]) => {
      const allSubDirsHasSizes = directory.directories.every((dirName) => content[dirName].size);
      if (allSubDirsHasSizes) {
        const subFilesSize = sum(directory.files.map((fileName) => content[fileName].size));
        const subDirsSize = sum(directory.directories.map((dirName) => content[dirName].size));
        directory.size = subDirsSize + subFilesSize;
      }
    });
  }
};

const getSmallDirectories = (content) => {
  return Object.values(content).filter(
    (directory) => directory.type === "directory" && directory.size < 100000
  );
};

const part1 = () => {
  const state = {
    pointer: 0,
    path: [],
    content: { "/": { type: "directory", directories: [], files: [] } },
  };

  while (state.pointer < input.length) {
    const command = input[state.pointer];

    switch (command.substring(2, 4)) {
      case "cd":
        parseChangeDirectoryCommand(command, state);
        break;
      case "ls":
        parseListCommand(command, state);
        break;
      default:
        throw new Error("Wtf command? " + command);
    }
  }

  calculateTotalDirectorySizes(state.content);

  const smallDirectories = getSmallDirectories(state.content);
  return sum(smallDirectories.map((x) => x.size));
};

const part2 = () => {};

console.log("#1:", part1()); // 1491614
// console.log("#2:", part2());
