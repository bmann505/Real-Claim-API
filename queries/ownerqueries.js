const knex = require('../db/connection');

module.exports = {
  claimByOwner: (id) => {
    return knex('claim')
      .select('claim.id', 'claim.description', 'claim.estimate', 'claim.status', 'claim.value', 'claim.address', 'claim.user_id',
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
          userRequests.push(knex('user')
            .select('user.name')
            .where('user.id', claim.user_id).first())
        })
        return Promise.all(userRequests).then(users => {
          return claims.map((claim, i) => {
            const index = i * 3
            claim.contractor = users[index].name
            delete claim.contractor_id
            claim.adjustor = users[index + 1].name
            delete claim.adjustor_id
            claim.user = users[index + 2].name
            delete claim.user_id
            return claim
          })
        })
      })
  }
}
