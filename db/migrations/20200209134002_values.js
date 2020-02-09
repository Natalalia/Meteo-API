exports.up = function(knex) {
  return knex.schema.createTable("information", information => {
    information.string("info-time").primary();
    information.float("temperature");
    information.float("power");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("information");
};
