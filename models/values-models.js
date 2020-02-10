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

const fetchPreviousTemperatures = (initialTime, finalTime) => {
  return connection
    .select("*")
    .from("temperatures")
    .whereBetween("time", [initialTime, finalTime])
    .then(temperatures => {
      return temperatures;
    })
    .catch(err => console.log(err, "err"));
};

module.exports = { fetchClosestValue, fetchPreviousTemperatures };
