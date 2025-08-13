/**
 * Processes a string with various options: trimming, uppercasing, splitting, and filtering.
 * @param {string} str - The string to process.
 * @param {Object} [options] - Processing options.
 * @param {boolean} [options.trim=true] - Whether to trim whitespace.
 * @param {boolean} [options.upper=false] - Whether to convert to uppercase.
 * @param {boolean} [options.filter=true] - Whether to filter out falsy values after splitting.
 * @param {string|null} [options.splitBy=" "] - Delimiter to split the string by. If null, no split is performed.
 * @returns {string|string[]} The processed string or array of strings.
 */
exports.processString = (
  str,
  { trim = true, upper = false, filter = true, splitBy = " " } = {}
) => {
  if (trim) str = str.trim();
  if (upper) str = str.toUpperCase();
  if (splitBy !== null) str = str.split(splitBy);
  if (filter) str = str.filter(Boolean);
  return str;
};
