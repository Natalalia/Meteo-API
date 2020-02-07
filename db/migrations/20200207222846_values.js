exports.up = function(knex) {
  return knex.schema.createTable("values", valuesTable => {
    valuesTable.string("time").primary();
    valuesTable.string("temperature");
    valuesTable.string("power");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("values");
};
