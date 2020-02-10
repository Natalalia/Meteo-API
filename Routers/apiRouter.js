const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/api-controller");
const {
  getClosestValues,
  getPreviousTemperatures
} = require("../controllers/values-controller");

apiRouter.route("/").get(getEndPoints);

apiRouter.route("/values").get(getClosestValues);

apiRouter.route("/temperatures").get(getPreviousTemperatures);

module.exports = apiRouter;
