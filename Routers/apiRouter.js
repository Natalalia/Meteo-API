const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/api-controller");
const { getCurrentValues } = require("../controllers/values-controller");

apiRouter.route("/").get(getEndPoints);

apiRouter.route("/values").get(getCurrentValues);

module.exports = apiRouter;
