const {
  fetchClosestValue,
  fetchPreviousValues
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

const getPreviousValues = (req, res) => {
  const { currentTime } = req.query;
  const { requiredInfo } = req.params;
  const previousHour = findPreviousHour(currentTime); // because I want to show the values from the previous hour I get the reference with this function
  fetchPreviousValues(previousHour, currentTime, requiredInfo).then(
    previousValues => {
      const averageValues = fetchAveragePerMinute(
        previousValues,
        previousHour,
        currentTime
      );
      res.status(200).send({ averageValues });
    }
  );
};

module.exports = {
  getClosestValues,
  getPreviousValues
};
