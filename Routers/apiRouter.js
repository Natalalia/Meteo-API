const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/api-controller");
const {
  getClosestValues,
  getPreviousValues
} = require("../controllers/values-controller");

apiRouter.route("/").get(getEndPoints);

apiRouter.route("/values").get(getClosestValues);

apiRouter.route("/:requiredInfo").get(getPreviousValues);

module.exports = apiRouter;
