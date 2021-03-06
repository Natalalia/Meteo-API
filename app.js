const express = require("express");
const cors = require("cors");
const apiRouter = require("./Routers/apiRouter");
const {
  handlePsqlError,
  handleCustomError,
  routeNotFound,
  handle500
} = require("./errors");

const app = express();

app.use(cors());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handlePsqlError);

app.use(handleCustomError);

app.use(handle500);

module.exports = app;
