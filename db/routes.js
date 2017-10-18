const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('./queries');
require('dotenv').config();



router.get('/user', (req, res, next) => {
  queries.getUsers()
    .then(users => {
      res.json(users);
    })
})

router.get('/claim', (req, res, next) => {
  queries.getClaims()
    .then(claims => {
      res.json(claims);
    })
})



module.exports = router;
