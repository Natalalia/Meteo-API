const connection = require("../db/connection");

const fetchClosestValue = (time, table) => {
  return connection
    .select("*")
    .from(table)
    .where("time", "<=", time)
    .orderBy("time", "desc")
    .limit(1)
    .then(values => {
      //console.log(values, "values");
      return values[0];
    });
};

module.exports = { fetchClosestValue };
