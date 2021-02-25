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
    logService.error('mapboxUrl is undefined');
  } else if (!req.params.place) {
    logService.error('place is undefined');
  } else {
    request({ url: `${mapboxUrl[0]}${req.params.place}${mapboxUrl[1]}`, json: true }, (error, response) => {
      if (error) {
        logService.error(error);
      } else if (!(response.body.features && response.body.features[0].center)) {
        logService.error('longitude and latitude are not available');
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
