const {
  fetchClosestValue,
  fetchPreviousValues
} = require("../models/values-models");

const fetchAveragePerMinute = require("../models/average-models");

const findPreviousHour = require("../utils/findPreviousHour");

/**
 * This function is the controller which aim is to send the previous temperature and power to the given time
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - express next function
 */
const getClosestValues = (req, res, next) => {
  const { currentTime } = req.query;

  if (!currentTime || currentTime.length < 8) {
    return next({
      status: 400,
      msg: "Bad Request - It needs a query to be formated as hour:minute:second"
    });
  }

  return Promise.all([
    fetchClosestValue(currentTime, "temperatures"),
    fetchClosestValue(currentTime, "power")
  ])
    .then(closestData => {
      const closestValues = {
        temperature: closestData[0],
        power: closestData[1]
      };
      res.status(200).send({ closestValues });
    })
    .catch(next);
};

/**
 * This function invokes the correspondent controller with the required information (temperatures) we are interested in
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - express next function
 */
const getPreviousTemperatures = (req, res, next) => {
  getPreviousValues(req, res, next, "temperatures");
};

/**
 * This function invokes the correspondent controller with the required information (power) we are interested in
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - express next function
 */
const getPreviousPower = (req, res, next) => {
  getPreviousValues(req, res, next, "power");
};

/**
 * This function is the controller which aim is to send the temperatures and power from one hour earlier to the given time
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - express next function
 */
const getPreviousValues = (req, res, next, requiredInfo) => {
  const { currentTime } = req.query;

  if (!currentTime || currentTime.length < 8) {
    return next({
      status: 400,
      msg: "Bad Request - It needs a query to be formated as hour:minute:second"
    });
  }

  const previousHour = findPreviousHour(currentTime); // because I want to show the values from the previous hour I get the reference with this function
  return fetchPreviousValues(previousHour, currentTime, requiredInfo)
    .then(previousValues => {
      const averageValues = fetchAveragePerMinute(
        previousValues,
        previousHour,
        currentTime
      );
      res.status(200).send({ averageValues });
    })
    .catch(next);
};

module.exports = {
  getClosestValues,
  getPreviousTemperatures,
  getPreviousPower
};
