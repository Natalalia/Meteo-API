const connection = require("../db/connection");

const fetchCurrentValues = time => {
  return connection
    .select("*")
    .from("values")
    .where("time", "<=", time)
    .orderBy("time", "desc")
    .limit(1)
    .then(values => {
      return values[0];
    });
};

module.exports = { fetchCurrentValues };
