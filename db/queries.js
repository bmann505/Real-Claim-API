const knex = require('./connection');

module.exports = {
  getUsers: () => {
    return knex('user')
  },
  getClaims: () => {
    return knex('claim')
  },
  signIn: (email) => {
    return knex('user').where('email', email)
  }
}
