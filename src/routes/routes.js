const express = require('express')
const fsRoute = require('./fs')
const geocodeRoute = require('./geocode')
const forecastRoute = require('./forecast')

const app = express()
const port = 3000

app.use('/fs', express.raw({ type: "application/json" }), fsRoute)
app.use('/geo', express.raw({ type: "application/json" }), geocodeRoute)
app.use('/forecast', express.raw({ type: "application/json" }), forecastRoute)

app.listen(port)