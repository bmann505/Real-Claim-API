exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "supplement"; ALTER SEQUENCE supplement_id_seq RESTART WITH 3')
    .then(() => {
      var supplements = [{
        id: 1,
        url: 'https://s3.us-east-2.amazonaws.com/supplementalclaim/fbf751cd-d3dc-47de-ac79-9a3dee1ae25d',
        name: 'cracked windows',
        type: 'picture',
        claim_id: 1
      }, {
        id: 2,
        url: 'https://s3.us-east-2.amazonaws.com/supplementalclaim/5633b74c-74d3-4c8b-9a44-5a9029920262',
        name: 'cracked windows',
        type: 'picture',
        claim_id: 1
      }]
      return knex('supplement').insert(supplements);
    })
};
