const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/api-controller");
const {
  getClosestValues,
  getPreviousValues
} = require("../controllers/values-controller");

apiRouter.route("/").get(getEndPoints); //route to get the endpoints json

apiRouter.route("/values").get(getClosestValues); //route to get the closest values to the time passed in as query

apiRouter.route("/:requiredInfo").get(getPreviousValues); //route to get the previous hour values temperatures or power as specified in param

module.exports = apiRouter;
