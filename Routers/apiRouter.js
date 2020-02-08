const apiRouter = require("express").Router();
const getEndPoints = require("../controllers/controller-api");

apiRouter.route("/").get(getEndPoints);

module.exports = apiRouter;
