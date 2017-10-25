exports.up = function(knex, Promise) {
  return knex.schema.createTable('claim', (table) => {
    table.increments();
    table.text('claim-description')
    table.integer('estimate');
    table.text('status');
    table.integer('value');
    table.text('address');
    table.integer('user_id').references('user.id').onDelete('cascade');
    table.integer('contractor_id').references('user.id').onDelete('cascade');
    table.integer('adjustor_id').references('user.id').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('claim');
};
