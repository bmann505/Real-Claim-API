const bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 4;')
    .then(() => {
      let hash1 = bcrypt.hashSync('brian', 8)
      let hash2 = bcrypt.hashSync('jon', 8)
      let hash3 = bcrypt.hashSync('dan', 8)
      let hash4 = bcrypt.hashSync('todd', 8)
      let hash5 = bcrypt.hashSync('jack', 8)
      let hash6 = bcrypt.hashSync('dirk', 8)
      let hash7 = bcrypt.hashSync('bill', 8)
      let hash8 = bcrypt.hashSync('james', 8)
      let hash9 = bcrypt.hashSync('dwight', 8)
      let users = [{
        id: 1,
        name: 'Brian',
        email: 'brian@realclaim.com',
        password: hash1,
        title: 'user',
        company: null,
        role: 'claims user'
      }, {
        id: 2,
        name: 'Jon',
        email: 'jon@smallstate.com',
        password: hash2,
        title: 'adjustor',
        company: 'smallstate',
        role: 'adjustor'
      }, {
        id: 3,
        name: 'Dan',
        email: 'dan@bestcontractor.com',
        password: hash3,
        title: 'contractor',
        company: 'best contractor',
        role: 'contractor'
      }, {
        id: 4,
        name: 'Todd',
        email: 'todd@realclaim.com',
        password: hash4,
        title: 'user',
        company: null,
        role: 'claims user'
      }, {
        id: 5,
        name: 'Jack',
        email: 'Jack@smallstate.com',
        password: hash5,
        title: 'adjustor',
        company: 'smallstate',
        role: 'adjustor'
      }, {
        id: 6,
        name: 'Dirk',
        email: 'dirk@worstcontractor.com',
        password: hash6,
        title: 'contractor',
        company: 'worst contractor',
        role: 'contractor'
      }, {
        id: 7,
        name: 'Bill',
        email: 'bill@realclaim.com',
        password: hash7,
        title: 'user',
        company: null,
        role: 'claims user'
      }, {
        id: 8,
        name: 'James',
        email: 'james@quackflec.com',
        password: hash8,
        title: 'adjustor',
        company: 'quackflec',
        role: 'adjustor'
      }, {
        id: 9,
        name: 'Dwight',
        email: 'dwight@firstcontractor.com',
        password: hash9,
        title: 'contractor',
        company: 'first contractor',
        role: 'contractor'
      }];
      return knex('user').insert(users);
    });
};
