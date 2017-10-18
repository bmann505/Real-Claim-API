exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.text('name');
    table.text('email');
    table.text('password');
    table.text('title');
    table.text('company');
    table.text('role');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
