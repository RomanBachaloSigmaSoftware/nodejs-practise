const express = require('express')
const fsRoute = require('./fs')

const app = express()
const port = 3000

app.use('/fs', express.raw({ type: "application/json" }), fsRoute)

app.listen(port)