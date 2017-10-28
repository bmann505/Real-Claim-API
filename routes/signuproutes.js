const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('../queries/authqueries');
const knex = require('../db/connection')
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const upload = require('multer')();
require('dotenv').config();
AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});
const s3 = new AWS.S3();

function validUser(user) {
  let validName = typeof user.name === 'string' && user.name.trim() !== '' && user.name !== null;
  let validEmail = typeof user.email === 'string' && user.email.match(/([@])/g) && user.email !== null;
  let validPassword = typeof user.password === 'string' && user.password.trim() !== '';
  return validName && validEmail && validPassword;
}

router.post('/', (req, res, next) => {
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
