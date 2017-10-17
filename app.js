const express = require('express');
const knex = require('./db/connection.js')
const app = require('express');
const cors = require('cors');
const port = process.env.PORT || 8080;
const routes = require('./db/routes');
const bodyParser = require('body-parser');
