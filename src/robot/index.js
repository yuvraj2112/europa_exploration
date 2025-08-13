const Robot = require("@/robot/robot");

const { errorLog } = require("@/utils/logger");

class ExplorationService {
  /**
   * @param {[number, number]} plateauBoundaries
   */
  setEdgeCoords(plateauBoundaries) {
    this.plateauBoundaries = plateauBoundaries;
  }

  /**
   * @param {Array<{coords: number[], direction: string, movements: string[]}>} instructions
   */
  executeExploration(instructions) {
    const results = [];

    for (const instruction of instructions) {
      try {
        const robot = new Robot(
          instruction.coords,
          instruction.direction,
          this.plateauBoundaries
        );

        robot.explore(instruction.movements);
        results.push(robot.position.join(" "));
      } catch (error) {
        errorLog(`Exploration failed: ${error.message}`);
        throw error;
      }
    }

    return results;
  }
}

module.exports = new ExplorationService();
