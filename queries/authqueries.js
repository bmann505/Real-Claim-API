const knex = require('../db/connection');

module.exports = {

  signIn: (email) => {
    return knex('user').where('email', email).returning('*')
  },
  signUp: (email) => {
    return knex('user').where('email', email)
  },
  insertUser: (body) => {
    return knex('user').insert(body).returning('*')
  }

}
