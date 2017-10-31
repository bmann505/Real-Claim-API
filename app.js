const express = require('express');
const knex = require('./db/connection.js')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const ownerRoutes = require('./routes/ownerroutes');
const adjustorRoutes = require('./routes/adjustorroutes');
const contractorRoutes = require('./routes/contractorroutes');
const signInRoutes = require('./routes/signinroutes');
const signUpRoutes = require('./routes/signuproutes');
const claimRoutes = require('./routes/claimroutes');
const supplementRoutes = require('./routes/supplementroutes');
const imageRoutes = require('./routes/imageroutes');
const userRoutes = require('./routes/userroutes');
const confirmationRoutes = require('./routes/confirmationroutes')
const bodyParser = require('body-parser');
const client = require('twilio')('ACa9c7a87b3bc86e2d13ab36118a884b35', '9fc5a6e0096bb91e811c95d709988d05')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Authorization');
  next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/owner', ownerRoutes);
app.use('/contractor', contractorRoutes);
app.use('/adjustor', adjustorRoutes)
app.use('/signup', signUpRoutes);
app.use('/signin', signInRoutes);
app.use('/claim', claimRoutes);
app.use('/supplement', supplementRoutes);
app.use('/image', imageRoutes);
app.use('/user', userRoutes);
app.use('/confirmation', confirmationRoutes);


app.listen(port);
