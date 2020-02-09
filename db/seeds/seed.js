const data = require("../data/readData");
const formatPower = require("../../utils/formatPower");

exports.seed = knex => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const formatedPower = formatPower(data.power.values);

      const temperatures = knex("temperatures")
        .insert(data.temperature.values)
        .returning("*");
      const power = knex("power")
        .insert(formatedPower)
        .returning("*");

      return Promise.all([temperatures, power]);
    });
};
