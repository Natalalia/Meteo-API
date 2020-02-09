const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/api-controller");
const { getClosestValues } = require("../controllers/values-controller");

apiRouter.route("/").get(getEndPoints);

apiRouter.route("/values").get(getClosestValues);

module.exports = apiRouter;
