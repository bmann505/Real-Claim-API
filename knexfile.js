module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/test_claim'
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
  }

};
