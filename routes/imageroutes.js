const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queries = require('../queries/imagequeries');
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


router.post('/', upload.single('image'), (req, res) => {
  let id = uuid();
  console.log(process.env.S3_BUCKET);
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
