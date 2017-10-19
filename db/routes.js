const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('./queries');
const knex = require('./connection')
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

router.post('/signin', (req, res, next) => {
  if (req.body.email !== undefined || req.body.password !== undefined) {
    let email = req.body.email;
    queries.signIn(email)
      .then(user => {
        if (user.length === 0) {
          res.json({
            error: 'Email or password did not match'
          })
        } else {
          var match = bcrypt.compareSync(req.body.password, user[0].password)
          if (match) {
            delete user[0].password
            var token = jwt.sign(user[0].id, process.env.TOKEN_SECRET);
            res.json({
              data: token
            })
          } else {
            res.json({
              error: 'Email or password did not match'
            })
          }
        }
      })
  } else {
    res.json({
      error: 'please enter an email'
    })
  }
});



module.exports = router;
