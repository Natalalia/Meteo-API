exports.up = function(knex) {
  return knex.schema.createTable("average", averageTable => {
    averageTable.string("time").primary();
    averageTable.string("temperature");
    averageTable.string("power");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("average");
};
