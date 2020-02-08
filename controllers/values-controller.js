const { fetchCurrentValues } = require("../models/values-models");

const getCurrentValues = (req, res) => {
  const { currentTime } = req.query;
  fetchCurrentValues(currentTime).then(currentValues => {
    res.status(200).send({ currentValues });
  });
};

module.exports = { getCurrentValues };
