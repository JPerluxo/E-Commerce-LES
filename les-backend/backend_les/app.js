const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.get('/', (req, res) => res.send('Server OK!'));

// Controllers
const userController = require('./src/controllers/userController');
app.use('/user', userController);

const beverageController = require('./src/controllers/beverageController');
app.use('/beverage', beverageController);

const couponController = require('./src/controllers/couponController');
app.use('/coupon', couponController);

module.exports = app;
