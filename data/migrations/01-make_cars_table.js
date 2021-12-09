exports.up = function (knex) {
  return knex.schema
  .createTable('cars', tbl =>{
    tbl.increments('car_id');
    tbl.string('vin').notNullable().unique();
    tbl.string('make').notNullable();
    tbl.string('model').notNullable();
    tbl.integer('mileage').notNullable();
    tbl.integer('title');
    tbl.integer('transmission');

  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
