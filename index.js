const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

var options = {
    type: 'application/json'
};

app.use(express.raw(options))

app.delete('/:fileName', (req, res) => {
    fs.exists(req.params.fileName, exists => {
        if (exists) {
            fs.unlink(req.params.fileName, err => {
                if (err) {
                    res.send(`Unable to delete ${req.params.fileName}`)
                    console.error(err)
                    return
                } else {
                    res.send(`${req.params.fileName} deleted`)
                }
            })
        } else {
            res.send(`${req.params.fileName} does not exist`)
        }
    })
})

app.post('/', (req, res) => {
    let documentValues = JSON.parse(req.body)
    let file = `${documentValues.fileName}.${documentValues.fileExtension}`
    fs.exists(file, exists => {
        if (exists) {
            res.send(`${file} already exists`)

        } else {
            fs.writeFile(file, documentValues.fileContent, err => {
                if (err) throw err
                res.send(`${file} has been created`)
            })
        }
    })
})

app.put('/', (req, res) => {
    let documentValues = JSON.parse(req.body)
    let file = `${documentValues.fileName}.${documentValues.fileExtension}`
    fs.exists(file, exists => {
        if (exists) {
            fs.writeFile(file, documentValues.fileContent, err => {
                if (err) throw err
                res.send(`${file} has been updated`)
            })

        } else {
            res.send(`${file} does not exist`)
        }
    })
})

app.get('/:fileName', (req, res) => {
    fs.exists(req.params.fileName, exists => {
        if (exists) {
            fs.readFile(req.params.fileName, (err, data) => {
                if (err) throw err;
                res.send(data);
            })
        } else {
            res.send(`${req.params.fileName} does not exist`)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app to work with filesystem listening at http://localhost:${port}`)
})