const knex = require('knex');
const configs = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const dbConfig = configs[environment];
const queries = require('./queries')

module.exports = knex[dbConfig];
