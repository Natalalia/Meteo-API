const express = require("express");
const cors = require("cors");
const apiRouter = require("./Routers/apiRouter");

const app = express();

app.use(cors());

app.use("/api", apiRouter);

module.exports = app;
