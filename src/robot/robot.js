const {
  directionToVector,
  directionToPos,
  names,
  directionOrderClockwise,
} = require("@/utils/constants");

const { infoLog, errorLog } = require("@/utils/logger");

/**
 * Represents a robot exploring a plateau.
 */
class Robot {
  /**
   * Creates a new Robot instance.
   * @param {number[]} position - Initial [x, y] position of the robot.
   * @param {string} direction - Initial direction ('N', 'E', 'S', 'W').
   * @param {number[]} edges - [maxX, maxY] boundaries of the plateau.
   * @throws {Error} If initial position is outside plateau boundaries.
   */
  constructor(position, direction, edges) {
    this.validateInitialPosition(position, edges);
    this.x = position[0];
    this.y = position[1];
    this.direction = direction;
    this.vector = directionToVector[direction];
    this.directionIdx = directionToPos[direction];
    this.maxX = edges[0];
    this.maxY = edges[1];
    this.name = names[Math.floor(Math.random() * names.length)];
    infoLog(`👾 ${this.name} is ready`);
  }

  /**
   * Validates that the initial position is within the plateau boundaries.
   * @param {number[]} position - [x, y] position.
   * @param {number[]} boundaries - [maxX, maxY] boundaries.
   * @throws {Error} If position is outside boundaries.
   */
  validateInitialPosition(position, boundaries) {
    if (position[0] > boundaries[0] || position[1] > boundaries[1]) {
      throw new Error("Initial position outside plateau boundaries");
    }
  }

  /**
   * Gets the current position and direction of the robot.
   * @returns {Array} [x, y, direction]
   */
  get position() {
    return [this.x, this.y, this.direction];
  }

  /**
   * Updates the robot's direction and movement vector based on directionIdx.
   * @private
   */
  #updateOrientationByDirectionIdx() {
    this.direction = directionOrderClockwise[this.directionIdx];
    this.vector = directionToVector[this.direction];
  }

  /**
   * Rotates the robot 90 degrees to the right (clockwise).
   */
  rotateRight() {
    this.directionIdx = (this.directionIdx + 1 + 4) % 4;
    this.#updateOrientationByDirectionIdx();
  }

  /**
   * Rotates the robot 90 degrees to the left (counter-clockwise).
   */
  rotateLeft() {
    this.directionIdx = (this.directionIdx - 1 + 4) % 4;
    this.#updateOrientationByDirectionIdx();
  }

  /**
   * Moves the robot one unit forward in the current direction.
   * Ignores the move if it would go outside the plateau boundaries.
   */
  move() {
    const newX = this.x + this.vector[0];
    const newY = this.y + this.vector[1];
    if (newX > -1 && newX <= this.maxX && newY > -1 && newY <= this.maxY) {
      this.x = newX;
      this.y = newY;
    } else {
      errorLog(`${this.name} at edge. Move ignored.`);
    }
  }

  /**
   * Executes a sequence of instructions ('L', 'R', 'M') for the robot.
   * @param {string[]} instructions - Array of instruction characters.
   */
  explore(instructions) {
    for (const move of instructions) {
      switch (move) {
        case "L":
          this.rotateLeft();
          break;
        case "R":
          this.rotateRight();
          break;
        case "M":
          this.move();
          break;
        default:
          errorLog(`Illegal move encountered by ${this.name}`);
      }
    }
  }
}

module.exports = Robot;
