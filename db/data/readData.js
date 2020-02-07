const yaml = require("js-yaml");
const fs = require("fs");

let data;

try {
  let dataContent = fs.readFileSync("./data/data.yml", "utf8");
  data = yaml.safeLoad(dataContent);
} catch (error) {
  console.log(error);
}

module.exports = data;
