const knex = require('../db/connection');


module.exports = {
  insertClaim: (body) => {
    return knex('supplement').insert(body).returning('*')
  },

  getSupplements: () => {
    return knex('supplement');
  }

}
