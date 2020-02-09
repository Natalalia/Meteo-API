exports.up = function(knex) {
  return knex.schema.createTable("temperatures", temperatures => {
    temperatures.time("time").primary();
    temperatures.float("value");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("temperatures");
};
