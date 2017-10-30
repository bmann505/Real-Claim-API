const knex = require('../db/connection');


module.exports = {
  insertSupplement: (body) => {
    return knex('supplement').insert(body).returning('*')
  },

  getSupplements: () => {
    return knex('supplement');
  },

  getSupplementById: (id) => {
    return knex('supplement').where('claim_id', id).returning('*')
  }

}
