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
const bodyParser = require('body-parser');

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


app.listen(port);
