const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('../queries/ownerqueries');
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

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  queries.claimByOwner(id)
    .then(claims => {
      res.json(claims)
    })
})

router.post('/image', upload.single('image'), (req, res) => {
  let id = uuid();
  s3.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: id,
    Body: new Buffer(req.file.buffer)
  }, err => {
    if (err) {
      console.log(err)
    } else {
      res.json(id)
    }
  });
})



module.exports = router;
