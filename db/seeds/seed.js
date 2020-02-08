const data = require("../data/readData");
const formatData = require("../../utils/formatData");
const changeUd = require("../../utils/changeUd");

exports.seed = knex => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const formatedData = formatData(data);
      const valuesToInsert = changeUd(formatedData);
      const values = knex("values")
        .insert(valuesToInsert)
        .returning("*");
      return values;
    });
};
