const { fetchClosestValue } = require("../models/values-models");

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

module.exports = { getClosestValues };
