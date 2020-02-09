exports.up = function(knex) {
  return knex.schema.createTable("power", power => {
    power.time("time").primary();
    power.float("value");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("power");
};
