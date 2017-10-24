exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.text('name');
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('title');
    table.text('company');
    table.text('role');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
