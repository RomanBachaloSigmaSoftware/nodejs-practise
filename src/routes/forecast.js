const express = require('express');
const request = require('request');
const router = express.Router();
const constants = require('../data/constants');
const logService = require('../log-service/logService');
const port = constants.port;

const weatherUrl = [
    'https://api.openweathermap.org/data/2.5/onecall?lat=',
    '&lon=',
    '&appid=6bf6d4d79901e20e0f4c99afbe44ec8a'
];

router.get('/:lat/:lon', (req, res) => {
    request({ url: `${weatherUrl[0]}${req.params.lat}${weatherUrl[1]}${req.params.lon}${weatherUrl[2]}`, json: true }, (error, response) => {
        if (error) {
            logService.log({ message: error, code: constants.codes.error });
        } else {
            res.send(response.body.current);
        }
    });
});

router.get('/:place', (req, res) => {
    request({ url: `http://localhost:${port}/geo/${req.params.place}`, json: true }, (error, response) => forecastCallback(error, response, res));
});

const forecastCallback = (error, response, res) => {
    if (error) {
        logService.log({ message: error, code: constants.codes.error });
    } else {
        request({ url: `http://localhost:${port}/forecast/${response.body.latitude}/${response.body.longitude}`, json: true }, (error, response) => {
            if (error) {
                logService.log({ message: error, code: constants.codes.error });
            } else {
                logService.log({ message: JSON.stringify(response.body), code: constants.codes.success });
                res.send(response.body);
            }
        });
    }
}

module.exports = router;