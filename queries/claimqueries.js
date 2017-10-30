const knex = require('../db/connection');

module.exports = {

  getClaims: () => {
    return knex('claim')
  },

  insertClaim: (body) => {
    return knex('claim').insert(body).returning('*')
  },

  updateClaim: (id, edit) => {
    return knex('claim').where('id', id)
      .update(edit)
      .returning('*')
  }
}
