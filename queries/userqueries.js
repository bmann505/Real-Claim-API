const knex = require('../db/connection');

module.exports = {
  getUsers: () => {
    return knex('user')
  }
}
