const readline = require("readline");

const { directions, instructions } = require("@/utils/constants");
const { processString } = require("@/utils/misc");
const { infoLog } = require("@/utils/logger");

/**
 * Executes a sequence of instructions ('L', 'R', 'M') for the robot.
 * @param {string[]} instructions - Array of instruction characters.
 */
exports.fetchInput = () =>
  new Promise((res, rej) => {
    let inputStrings = [];
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: process.stdin.isTTY,
    });

    rl.on("line", (line) => {
      if (!line) {
        rl.close();
        return;
      }
      inputStrings.push(line);
    });

    rl.on("close", () => {
      infoLog("\n✅ Input captured");
      inputStrings = inputStrings.map((v) => v.trim()).filter(Boolean);
      if (!Array.isArray(inputStrings) || !inputStrings?.length) {
        return rej(new Error("Invalid input"));
      }
      res(inputStrings);
    });
  });

/**
 * Validates and parses coordinates.
 * @param {Array} coordinates - Array containing x and y coordinates.
 * @returns {number[]} Parsed coordinates as integers.
 * @throws {Error} If coordinates are invalid.
 */
exports.validateCoords = (coordinates) => {
  if (!Array.isArray(coordinates))
    throw new Error(
      `Invalid coordinate type provided. Received: ${coordinates}`
    );

  if (coordinates.length !== 2)
    throw new Error(
      `Invalid coordinates. Expected x y. Received: ${coordinates}`
    );

  if (!coordinates.every((num) => !isNaN(num) && num > -1))
    throw new Error(
      `Invalid dimensions provided. Received: ${coordinates[0]}, ${coordinates[1]}`
    );
  return coordinates.map((v) => parseInt(v));
};

/**
 * Processes a robot's initial state string into coordinates and direction.
 * @param {string} stateString - The robot's state as a string.
 * @returns {{coords: number[], direction: string}} Parsed state.
 * @throws {Error} If direction is invalid.
 */
const processState = (stateString) => {
  const stateList = processString(stateString);
  const coords = this.validateCoords(stateList.splice(0, 2));
  const direction = stateList.shift();
  if (!directions.includes(direction))
    throw new Error(`Invalid direction encountered for robot: ${direction}`);

  return { coords, direction };
};

/**
 * Validates and parses the full input for plateau and robot instructions.
 * @param {string[]} input - Array of input strings.
 * @returns {{platCoords: number[], robotInstructions: Array<{coords: number[], direction: string, movements: string[]}>}} Parsed input.
 * @throws {Error} If input is invalid.
 */
exports.validateInput = (input) => {
  infoLog("✅ Validating input...");

  let coords = processString(input.shift());
  coords = this.validateCoords(coords);

  const instructionLen = input.length;
  if (instructionLen % 2 !== 0)
    throw new Error("Invalid instruction count encountered");

  const robotInstructions = [];
  for (let i = 0; i < instructionLen; i += 2) {
    const { coords, direction } = processState(input[i]);
    const robotMovement = processString(input[i + 1], {
      upper: true,
      splitBy: "",
    });

    if (!robotMovement.every((i) => instructions.includes(i)))
      throw new Error(
        `Invalid movement encountered for robot: ${robotMovement}`
      );

    robotInstructions.push({
      coords,
      direction,
      movements: robotMovement,
    });
  }
  infoLog("✅ Input Validated");

  return {
    platCoords: coords,
    robotInstructions,
  };
};
