const fs = require("fs");

const getEndPoints = (req, res, next) => {
  let data;
  try {
    data = fs.readFileSync(`${__dirname}/../endpoints.json`, "utf8");
  } catch (error) {
    console.log(error);
  }
  res.status(200).send(data);
};

module.exports = getEndPoints;
