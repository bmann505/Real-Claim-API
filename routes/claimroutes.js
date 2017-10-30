const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('../queries/claimqueries');
const knex = require('../db/connection')
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const upload = require('multer')();
require('dotenv').config();


router.get('/', (req, res, next) => {
  queries.getClaims()
    .then(claims => {
      res.json(claims);
    })
})

router.post('/', (req, res, next) => {
  let body = req.body;
  queries.insertClaim(body)
    .then(claim => {
      res.json(claim)
    })
})

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let edit = req.body;
  queries.updateClaim(id, edit)
    .then(edited => {
      res.json(edited);
    })
})

module.exports = router;
