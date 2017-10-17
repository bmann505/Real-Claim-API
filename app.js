const express = require('express');
const knex = require('./db/connection.js')
const app = require('express');
const cors = require('cors');
const port = process.env.PORT || 8080;
const routes = require('./db/routes');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', routes);


app.listen(port);
