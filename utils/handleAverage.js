const createTimeReference = require("./timeReference");

/**
 * Creates an object counting the total of the values in a specific minute and the number of times a value has been registered
 * @param {array} values - A group of time-value pair objects
 */
function createTallyPerMinute(values) {
  return values.reduce((tally, currentValue) => {
    const hour = currentValue.time.split(":")[0];
    const minute = currentValue.time.split(":")[1];
    const key = [hour, minute, "00"].join(":");
    if (Object.keys(tally).includes(key)) {
      tally[key].count += 1;
      tally[key].total += currentValue.value;
    } else {
      tally[key] = {
        count: 1,
        total: currentValue.value
      };
    }
    return tally;
  }, {});
}

/**
 * Returns a similar object to the given one but with every minute included
 * @param {object} tally - Register of the number of values have been given in a minute and the number of time
 * @param {string} initialTime - Initial time the tally should have registered
 * @param {string} finalTime - Final time the tally should have registered
 * @param {number} amount - Quantity of minutes we expect to store
 */
function completeTally(tally, initialTime, finalTime, amount) {
  const newTally = { ...tally };

  if (Object.keys(newTally).length < amount) {
    const timeReference = createTimeReference(initialTime, finalTime); //I need a reference of all the times

    for (let i = 0; i < timeReference.length; i++) {
      if (!Object.keys(newTally).includes(timeReference[i])) {
        newTally[timeReference[i]] = { count: 0, total: 0 };
      }
    }
  }

  return newTally;
}

/**
 * Calculates the average in each specific minute
 * @param {object} tally - Register of the total value in a specific minute and the number of times a value was registered that minute
 */
function calculateAverage(tally) {
  const averageValues = [];
  for (const key in tally) {
    const item = {};
    item["time"] = key;
    item["average"] = (tally[key].total / tally[key].count).toFixed(2);
    averageValues.push(item);
  }
  return averageValues;
}

module.exports = {
  createTallyPerMinute,
  completeTally,
  calculateAverage
};
