const createTimeReference = require("./timeReference");

function createTallyPerMinute(temperatures) {
  return temperatures.reduce((tally, temperature) => {
    const hour = temperature.time.split(":")[0];
    const minute = temperature.time.split(":")[1];
    const key = [hour, minute, "00"].join(":");
    if (Object.keys(tally).includes(key)) {
      tally[key].count += 1;
      tally[key].total += temperature.value;
    } else {
      tally[key] = {
        count: 1,
        total: temperature.value
      };
    }
    return tally;
  }, {});
}

function completeTally(tally, initialTime, finalTime, amount) {
  const newTally = { ...tally };

  if (Object.keys(newTally).length < amount) {
    const timeReference = createTimeReference(initialTime, finalTime);

    for (let i = 0; i < timeReference.length; i++) {
      if (!Object.keys(newTally).includes(timeReference[i])) {
        newTally[timeReference[i]] = { count: 0, total: 0 };
      }
    }
  }

  return newTally;
}

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
