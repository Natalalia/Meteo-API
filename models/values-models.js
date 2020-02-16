const connection = require("../db/connection");

/**
 * It fetches the required info from the data base an sends it back to the controller
 * @param {string} time - current time
 * @param {string} table - db table to look at
 */
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

/**
 * It fetches the required info from the data base and sends it back to the controller
 * @param {string} initialTime - the previous hour
 * @param {string} finalTime - the current time
 * @param {string} table - db table to look at
 */
const fetchPreviousValues = (initialTime, finalTime, table) => {
  return connection
    .select("*")
    .from(table)
    .whereBetween("time", [initialTime, finalTime])
    .then(previousValues => {
      return previousValues;
    });
};

module.exports = { fetchClosestValue, fetchPreviousValues };
