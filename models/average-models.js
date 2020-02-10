const {
  createTallyPerMinute,
  calculateAverage
} = require("../utils/handleAverage");

const fetchAveragePerMinute = temperatures => {
  const tally = createTallyPerMinute(temperatures);

  return calculateAverage(tally);
};

module.exports = fetchAveragePerMinute;
