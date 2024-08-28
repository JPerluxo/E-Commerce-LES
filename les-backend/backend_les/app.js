const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => res.send('Server OK!'));

// Controllers

module.exports = app;
