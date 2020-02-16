const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/api-controller");
const {
  getClosestValues,
  getPreviousTemperatures,
  getPreviousPower
} = require("../controllers/values-controller");
const { methodNotAllowed } = require("../errors");

apiRouter.route("/").get(getEndPoints); //route to get the endpoints json

apiRouter
  .route("/values")
  .get(getClosestValues) //route to get the closest values to the time passed in as query
  .all(methodNotAllowed);

apiRouter
  .route("/temperatures")
  .get(getPreviousTemperatures) //route to get the previous hour values temperatures or power as specified in param
  .all(methodNotAllowed);

apiRouter
  .route("/power")
  .get(getPreviousPower) //route to get the previous hour values temperatures or power as specified in param
  .all(methodNotAllowed);

module.exports = apiRouter;
