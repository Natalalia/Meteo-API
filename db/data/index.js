const ENV = process.env.NODE_ENV || "development";
const development = require("./readData");

const data = {
  development,
  production: development
};

module.exports = data[ENV];
