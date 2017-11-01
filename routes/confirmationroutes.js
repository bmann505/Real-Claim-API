const client = require('twilio')('ACa9c7a87b3bc86e2d13ab36118a884b35', '9fc5a6e0096bb91e811c95d709988d05')
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

router.get('/', function(req, res, next) {
  client.messages.create({
    to: "+15052691899",
    from: "+15052070927",
    body: "Your Claim has been Approved!!",
  }, function(err, message) {
    console.log(message.sid);
  });
})


module.exports = router;
