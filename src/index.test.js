/* eslint-env jest */

const explorationService = require("@/robot");
const { validateInput } = require("@/utils/input");

describe("Europa Exploration Integration", () => {
  it("should compute correct final positions for sample input", () => {
    const input = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];
    const { platCoords, robotInstructions } = validateInput(input);
    explorationService.setEdgeCoords(platCoords);

    // Act
    const results = explorationService.executeExploration(robotInstructions);

    // Assert
    expect(results).toEqual(["1 3 N", "5 1 E"]);
  });

  it("should compute correct final positions for sample input", () => {
    const input = ["5 5", "1 2 N", "RRRRRRRR", "3 3 E", "MMRMMRMRRM"];
    const { platCoords, robotInstructions } = validateInput(input);
    explorationService.setEdgeCoords(platCoords);

    // Act
    const results = explorationService.executeExploration(robotInstructions);

    // Assert
    expect(results).toEqual(["1 2 N", "5 1 E"]);
  });

  it("should throw error for invalid plateau coordinates", () => {
    const input = ["A B", "1 2 N", "LMLMLMLMM"];
    expect(() => {
      validateInput(input);
    }).toThrow();
  });

  it("should throw error for invalid robot position", () => {
    const input = ["5 5", "X Y Z", "LMLMLMLMM"];
    expect(() => {
      validateInput(input);
    }).toThrow();
  });

  it("should throw error for invalid movement instructions", () => {
    const input = ["5 5", "1 2 N", "LMXLM"];
    expect(() => {
      validateInput(input);
    }).toThrow();
  });

  it("should not move outside plateau", () => {
    const input = ["2 2", "1 2 N", "MMMM"];
    const { platCoords, robotInstructions } = validateInput(input);
    explorationService.setEdgeCoords(platCoords);
    const results = explorationService.executeExploration(robotInstructions);
    expect(results).toEqual(["1 2 N"]);
  });
});
