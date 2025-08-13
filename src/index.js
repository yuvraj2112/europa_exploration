require("module-alias/register");

const explorationService = require("@/robot");
const { fetchInput, validateInput } = require("@/utils/input");
const { infoLog } = require("@/utils/logger");

/**
 * Main entry point for the Europa exploration service.
 * Fetches input, validates it, sets up the exploration grid,
 * executes robot instructions, and prints results.
 * @async
 * @returns {Promise<void>}
 */
const main = async () => {
  infoLog("✅ Service up & ready for input...");

  try {
    const input = await fetchInput();
    const { platCoords, robotInstructions } = validateInput(input);
    explorationService.setEdgeCoords(platCoords);
    const results = explorationService.executeExploration(robotInstructions);
    results.forEach((v) => console.log(v));
  } catch (err) {
    // Log error message if any step fails
    console.error("❌ Error encountered");
    console.error(err?.message ?? "Something went wrong");
    // console.error(err);
  }
};

main();
