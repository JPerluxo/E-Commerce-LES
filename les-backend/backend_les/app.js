const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send('Server OK!'));

// Controllers
const userController = require('./src/controllers/userController');
app.use('/user', userController);

const beverageController = require('./src/controllers/beverageController');
app.use('/beverage', beverageController);

module.exports = app;
