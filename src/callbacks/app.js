const request = require('request');
const constants = require('../data/constants');
const logService = require('../log-service/logService');

const weatherUrl = [
  'https://api.openweathermap.org/data/2.5/onecall?lat=',
  '&lon=',
  '&appid=6bf6d4d79901e20e0f4c99afbe44ec8a',
];

const mapboxUrl = [
  'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  '.json?access_token=pk.eyJ1Ijoicm9tYW5iYWNoYWxvcyIsImEiOiJja2xjNm82cnAwbWt6Mm9wMGZucWRlemdvIn0.YMTWniNZSYxZCYkLCijXiQ&limit=1',
];

// gets the coordinates by given address and calls a callback function
const weatherForecast = (mapUrl, forecastUrl, address, callback) => {
  if (!(mapUrl && mapUrl[0] && mapUrl[1])) {
    logService.error('mapUrl is undefined');
  } else {
    request({ url: `${mapUrl[0]}${address}${mapUrl[1]}`, json: true }, (err, res) => {
      if (err) {
        logService.error(err);
      } else {
        const place = {
          longitude: res.body.features[0].center[0],
          latitude: res.body.features[0].center[1],
        };
        callback(forecastUrl, place);
      }
    });
  }
};

// gets the weather for given coordinates
const getWeather = (forecastUrl, coordinates) => {
  if (!(forecastUrl && forecastUrl[0] && forecastUrl[1] && forecastUrl[2])) {
    logService.error('forecastUrl is undefined');
  } else {
    request({ url: `${forecastUrl[0]}${coordinates.latitude}${forecastUrl[1]}${coordinates.longitude}${forecastUrl[2]}`, json: true }, (err, res) => {
      if (err) {
        logService.error(err);
      } else {
        logService.log({ message: `The weather is ${res.body.current.weather[0].main}`, code: constants.codes.success });
      }
    });
  }
};

weatherForecast(mapboxUrl, weatherUrl, 'Lviv', getWeather);
