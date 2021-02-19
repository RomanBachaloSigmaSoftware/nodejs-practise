const express = require('express')
const request = require('request')
const router = express.Router()

const mapboxUrl = [
    'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    '.json?access_token=pk.eyJ1Ijoicm9tYW5iYWNoYWxvcyIsImEiOiJja2xjNm82cnAwbWt6Mm9wMGZucWRlemdvIn0.YMTWniNZSYxZCYkLCijXiQ&limit=1'
]

router.get('/:place', (req, res) => {
    request({ url: mapboxUrl[0] + req.params.place + mapboxUrl[1], json: true }, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            res.send({
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
            })
        }
    })
})

module.exports = router