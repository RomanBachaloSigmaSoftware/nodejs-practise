const express = require('express');
const fsRoute = require('./fs');
const geocodeRoute = require('./geocode');
const forecastRoute = require('./forecast');
const bodyParser = require('body-parser');
const constants = require('../data/constants');

const app = express();
const port = constants.port;

app.use(bodyParser.json({ limit: '64kb' })); // for parsing application/json

app.use('/fs', fsRoute);
app.use('/geo', geocodeRoute);
app.use('/forecast', forecastRoute);

app.listen(port);