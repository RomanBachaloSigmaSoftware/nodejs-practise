const request = require('request')
const weatherUrl = [
    'https://api.openweathermap.org/data/2.5/onecall?lat=',
    '&lon=',
    '&appid=6bf6d4d79901e20e0f4c99afbe44ec8a'
]

const mapboxUrl = [
    'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    '.json?access_token=pk.eyJ1Ijoicm9tYW5iYWNoYWxvcyIsImEiOiJja2xjNm82cnAwbWt6Mm9wMGZucWRlemdvIn0.YMTWniNZSYxZCYkLCijXiQ&limit=1'
]

// gets the coordinates by given address and calls a callback function
const weatherForecast = (address, callback) => {
    request({ url: mapboxUrl[0] + address + mapboxUrl[1], json: true }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            const place = {
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1]
            }
            callback(place)
        }
    })
}

// gets the weather for given coordinates
const getWeather = (coordinates) => {
    request({ url: weatherUrl[0] + coordinates.latitude + weatherUrl[1] + coordinates.longitude + weatherUrl[2], json: true }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`The weather is ${res.body.current.weather[0].main}`)
        }
    })
}

weatherForecast('Lviv', getWeather)