const connection = require("../db/connection");

const fetchClosestValue = (time, table) => {
  return connection
    .select("*")
    .from(table)
    .where("time", "<=", time)
    .orderBy("time", "desc")
    .limit(1)
    .then(values => {
      return values[0];
    });
};

const fetchPreviousValues = (initialTime, finalTime, table) => {
  return connection
    .select("*")
    .from(table)
    .whereBetween("time", [initialTime, finalTime])
    .then(previousValues => {
      return previousValues;
    })
    .catch(err => console.log(err, "err"));
};

module.exports = { fetchClosestValue, fetchPreviousValues };
