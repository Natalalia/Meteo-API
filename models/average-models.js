const {
  createTallyPerMinute,
  completeTally,
  calculateAverage
} = require("../utils/handleAverage");

const orderAveragePerMinutes = require("../utils/orderResponse");

const fetchAveragePerMinute = (values, initialTime, finalTime) => {
  const tally = createTallyPerMinute(values); //In order to keep track of my info in each minute I use a tally object which also counts the number of info I got in each of them
  const completedTally = completeTally(tally, initialTime, finalTime, 60); // Because I want to update the info every minute I need to make sure I got all the minutes
  const averageInfo = calculateAverage(completedTally); // The following function calculates the average per minute
  return orderAveragePerMinutes(averageInfo); //Because objects do not keep the order, I make sure my info is in the correct order with this function
};

module.exports = fetchAveragePerMinute;
