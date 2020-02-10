const {
  fetchClosestValue,
  fetchPreviousTemperatures
} = require("../models/values-models");

const fetchAveragePerMinute = require("../models/average-models");

const findPreviousHour = require("../utils/findPreviousHour");

const getClosestValues = (req, res) => {
  const { currentTime } = req.query;

  return Promise.all([
    fetchClosestValue(currentTime, "temperatures"),
    fetchClosestValue(currentTime, "power")
  ]).then(closestData => {
    const closestValues = {
      temperature: closestData[0],
      power: closestData[1]
    };
    res.status(200).send({ closestValues });
  });
};

const getPreviousTemperatures = (req, res) => {
  const { currentTime } = req.query;
  const previousHour = findPreviousHour(currentTime);
  fetchPreviousTemperatures(previousHour, currentTime).then(
    previousTemperatures => {
      const averageValues = fetchAveragePerMinute(
        previousTemperatures,
        previousHour,
        currentTime
      );
      res.status(200).send({ averageValues });
    }
  );
};

module.exports = { getClosestValues, getPreviousTemperatures };
