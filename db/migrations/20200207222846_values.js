exports.up = function(knex) {
  return knex.schema.createTable("values", valuesTable => {
    valuesTable.string("time").primary();
    valuesTable.float("temperature");
    valuesTable.float("power");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("values");
};
