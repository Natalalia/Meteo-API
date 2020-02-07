exports.up = function(knex) {
  return knex.schema.createTable("average", averageTable => {
    averageTable.string("time").primary();
    averageTable.float("temperature");
    averageTable.float("power");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("average");
};
