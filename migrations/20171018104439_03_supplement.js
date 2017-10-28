exports.up = function(knex, Promise) {
  return knex.schema.createTable('supplement', (table) => {
    table.increments();
    table.text('url');
    table.text('name');
    table.text('type');
    table.integer('claim_id').references('claim.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('supplement');
};
