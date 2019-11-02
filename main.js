const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});
const app = express();
const port = process.env.PORT;

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require('./src/routes/index')(app);

app.listen(port, () => {
  console.log('Zurbo is running on port ' + port);
});

module.exports = app;
