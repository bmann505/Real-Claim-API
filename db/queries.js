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
  },
  claimByOwner: (id) => {
    return knex('claim')
      .select('claim.id', 'claim.value', 'claim.status', 'claim.value', 'claim.address', 'claim.user_id',
        'claim.contractor_id', 'claim.adjustor_id')
      .innerJoin('user', 'user.id', 'claim.user_id')
      .where('user.id', id)
      .then(claims => {
        let userRequests = []
        claims.forEach(claim => {
          userRequests.push(knex('user')
            .select('user.name')
            .where('user.id', claim.contractor_id).first())
          userRequests.push(knex('user')
            .select('user.name')
            .where('user.id', claim.adjustor_id).first())
        })
        return Promise.all(userRequests).then(users => {
          return claims.map((claim, i) => {
            const index = i * 2
            claim.contractor = users[index].name
            delete claim.contractor_id
            claim.adjustor = users[index + 1].name
            delete claim.adjustor_id
            return claim
          })
        })
      })

  }
}
