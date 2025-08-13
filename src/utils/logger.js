const DEBUG = process.env.DEBUG === "true";

exports.infoLog = (...args) => {
  if (DEBUG) {
    console.log(...args);
  }
};

exports.errorLog = (...args) => {
  if (DEBUG) {
    console.error(...args);
  }
};
