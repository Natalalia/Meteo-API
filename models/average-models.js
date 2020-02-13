const {
  createTallyPerMinute,
  completeTally,
  calculateAverage
} = require("../utils/handleAverage");

const orderAveragePerMinutes = require("../utils/orderResponse");

const fetchAveragePerMinute = (values, initialTime, finalTime) => {
  const tally = createTallyPerMinute(values);
  const completedTally = completeTally(tally, initialTime, finalTime, 60);
  const averageInfo = calculateAverage(completedTally);
  return orderAveragePerMinutes(averageInfo);
};

module.exports = fetchAveragePerMinute;
