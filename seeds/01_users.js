exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 4;')
    .then(() => {
      var users = [{
        id: 1,
        name: 'Brian',
        email: 'brian@realclaim.com',
        password: 'brian',
        title: 'user',
        company: null,
        role: 'claims user'
      }, {
        id: 2,
        name: 'Jon',
        email: 'jon@smallstate.com',
        password: 'jon',
        title: 'adjustor',
        company: 'smallstate',
        role: 'adjustor'
      }, {
        id: 3,
        name: 'Dan',
        email: 'dan@bestcontractor.com',
        password: 'dan',
        title: 'contractor',
        company: 'best contractor',
        role: 'contractor'
      }, {
        id: 4,
        name: 'Todd',
        email: 'todd@realclaim.com',
        password: 'todd',
        title: 'user',
        company: null,
        role: 'claims user'
      }, {
        id: 5,
        name: 'Jack',
        email: 'Jack@smallstate.com',
        password: 'jack',
        title: 'adjustor',
        company: 'smallstate',
        role: 'adjustor'
      }, {
        id: 6,
        name: 'Dirk',
        email: 'dirk@worstcontractor.com',
        password: 'dirk',
        title: 'contractor',
        company: 'worst contractor',
        role: 'contractor'
      }, {
        id: 7,
        name: 'Bill',
        email: 'bill@realclaim.com',
        password: 'bill',
        title: 'user',
        company: null,
        role: 'claims user'
      }, {
        id: 8,
        name: 'James',
        email: 'james@quackflec.com',
        password: 'jack',
        title: 'adjustor',
        company: 'quackflec',
        role: 'adjustor'
      }, {
        id: 9,
        name: 'Dwight',
        email: 'dwight@firstcontractor.com',
        password: 'dirk',
        title: 'contractor',
        company: 'first contractor',
        role: 'contractor'
      }];
      return knex('user').insert(users);
    });
};
