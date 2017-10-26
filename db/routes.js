const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('./queries');
const knex = require('./connection')
require('dotenv').config();

function validUser(user) {
  let validName = typeof user.name === 'string' && user.name.trim() !== '' && user.name !== null;
  let validEmail = typeof user.email === 'string' && user.email.match(/([@])/g) && user.email !== null;
  let validPassword = typeof user.password === 'string' && user.password.trim() !== '';
  return validName && validEmail && validPassword;
}

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

router.get('/owner/:id', (req, res, next) => {
  let id = req.params.id
  queries.claimByOwner(id)
    .then(claims => {
      res.json(claims)
    })
})

router.get('/contractor/:id', (req, res, next) => {
  let id = req.params.id
  queries.claimByContractor(id)
    .then(claims => {
      res.json(claims)
    })
})

router.get('/adjustor/:id', (req, res, next) => {
  let id = req.params.id
  queries.claimByAdjustor(id)
    .then(claims => {
      res.json(claims)
    })
})

router.post('/claim', (req, res, next) => {
  let body = req.body;
  queries.insertClaim(body)
    .then(claim => {
      res.json(claim)
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
          const match = bcrypt.compareSync(req.body.password, user[0].password)
          if (match) {
            delete user[0].password
            const token = jwt.sign(user[0].id, process.env.TOKEN_SECRET);
            const role = user[0].role;
            res.json({
              data: token,
              role: role
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

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    let email = req.body.email;
    let body = req.body;
    queries.signUp(email)
      .then(user => {
        if (user.length === 0) {
          var hash = bcrypt.hashSync(req.body.password, 8)
          req.body.password = hash
          queries.insertUser(body)
            .then(user => {
              delete user[0].password
              const token = jwt.sign(user[0].id, process.env.TOKEN_SECRET);
              let role = user[0].role;
              if (role === "") {
                role = 'claims user'
              }
              res.json({
                data: token,
                role: role
              })
            })
        } else {
          res.json({
            error: 'email already in use'
          });
        }
      })
  } else {
    res.json({
      error: 'Invalid inputs.'
    })
  }
});



module.exports = router;
