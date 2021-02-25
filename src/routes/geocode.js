const express = require('express');
const request = require('request');
const logService = require('../log-service/logService');
const constants = require('../data/constants');

const router = express.Router();

const mapboxUrl = [
  'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  '.json?access_token=pk.eyJ1Ijoicm9tYW5iYWNoYWxvcyIsImEiOiJja2xjNm82cnAwbWt6Mm9wMGZucWRlemdvIn0.YMTWniNZSYxZCYkLCijXiQ&limit=1',
];

router.get('/:place', (req, res) => {
  if (!(mapboxUrl && mapboxUrl[0] && mapboxUrl[1])) {
    logService.log({ message: 'mapboxUrl is undefined', code: constants.codes.error });
  } else if (!req.params.place) {
    logService.log({ message: 'place is undefined', code: constants.codes.error });
  } else {
    request({ url: `${mapboxUrl[0]}${req.params.place}${mapboxUrl[1]}`, json: true }, (error, response) => {
      if (error) {
        logService.log({ message: error, code: constants.codes.error });
      } else if (!(response.body.features && response.body.features[0].center)) {
        logService.log({ message: 'longitude and latitude are not available', code: constants.codes.error });
      } else {
        res.send({
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
        });
      }
    });
  }
});

module.exports = router;
