exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "claim"; ALTER SEQUENCE claim_id_seq RESTART WITH 5')
    .then(() => {
      var claims = [{
        id: 1,
        estimate: 4000,
        status: 'pending contractor',
        value: 4000,
        address: '123 Platte st.',
        contractor_id: 3,
        user_id: 1,
        adjustor_id: 2
      }, {
        id: 2,
        estimate: 60000,
        status: 'pending adjustor',
        value: 60000,
        address: '717 17th st.',
        contractor_id: 6,
        user_id: 4,
        adjustor_id: 5
      }, {
        id: 3,
        estimate: 7000,
        status: 'approved',
        value: 8000,
        address: '32 cudi ave.',
        contractor_id: 9,
        user_id: 7,
        adjustor_id: 8
      }, {
        id: 4,
        estimate: 10000,
        status: 'pending contractor',
        value: 10000,
        address: '8513 1st st.',
        contractor_id: 9,
        user_id: 1,
        adjustor_id: 8
      }]
      return knex('claim').insert(claims);
    })
};
