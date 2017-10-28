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

router.post('/', (req, res, next) => {
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



module.exports = router;
