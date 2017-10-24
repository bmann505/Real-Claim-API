module.exports = {

  development: {
    client: 'pg',
    connection: 'postgress://localhost/test_claim'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
