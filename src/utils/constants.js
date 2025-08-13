exports.instructions = ["M", "L", "R"];

exports.directionToVector = {
  N: [0, 1],
  S: [0, -1],
  W: [-1, 0],
  E: [1, 0],
};

exports.directionToPos = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
};

exports.directions = Object.keys(this.directionToPos);

exports.directionOrderClockwise = ["N", "E", "S", "W"];

exports.names = ["Pickles", "Wall-e", "Juice", "Juno", "Cassini", "Galileo"];
