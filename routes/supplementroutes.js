const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('../queries/supplementqueries');
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
  let body = req.body;
  queries.insertSupplement(body)
    .then(supplement => {
      res.json(supplement)
    })
})

router.get('/', (req, res, next) => {
  queries.getSupplements()
    .then(supplements => {
      res.json(supplements)
    })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  queries.getSupplementById(id)
    .then(supplement => {
      res.json(supplement)
    })
})

module.exports = router;
