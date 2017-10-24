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
  },
  signUp: (email) => {
    return knex('user').where('email', email)
  },
  insertUser: (body) => {
    return knex('user').insert(body).returning('*')
  },
  insertClaim: (body) => {
    return knex('claim').insert(body).returning('*')
  }
}
