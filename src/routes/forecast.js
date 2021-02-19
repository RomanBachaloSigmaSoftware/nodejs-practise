const express = require('express')
const request = require('request')
const router = express.Router()
const port = 3000

const weatherUrl = [
    'https://api.openweathermap.org/data/2.5/onecall?lat=',
    '&lon=',
    '&appid=6bf6d4d79901e20e0f4c99afbe44ec8a'
]

router.get('/:lat/:lon', (req, res) => {
    request({ url: weatherUrl[0] + req.params.lat + weatherUrl[1] + req.params.lon + weatherUrl[2], json: true }, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            res.send(response.body.current)
        }
    })
})

router.get('/:place', (req, res) => {
    request({ url: `http://localhost:${port}/geo/${req.params.place}`, json: true }, (error, geoResponse) => {
        if (error) {
            console.log(error)
        } else {
            request({ url: `http://localhost:${port}/forecast/${geoResponse.body.latitude}/${geoResponse.body.longitude}`, json: true }, (error, response) => {
                if (error) {
                    console.log(error)
                } else {
                    res.send(response.body)
                }
            })
        }
    })
})

module.exports = router