const knex = require('../db/connection');

module.exports = {

  getClaims: () => {
    return knex('claim')
  },

  insertClaim: (body) => {
    return knex('claim').insert(body).returning('*')
  }

}
