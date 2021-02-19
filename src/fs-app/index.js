const chalk = require('chalk')
const request = require('request')
const yargs = require('yargs')

const port = 3000
const baseUrl = `http://localhost:${port}/fs/`

yargs.command({
    command: 'get',
    builder: {
        name: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let url = baseUrl + argv.name
        request({ url: url }, (err, res) => {
            if (err) {
                console.log(chalk.red(err))
            } else if (res.statusCode >= 400) {
                console.log(chalk.red(res.body))
            } else {
                console.log(chalk.green(res.body))
            }
        })
    }
})

yargs.command({
    command: 'delete',
    builder: {
        name: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let url = baseUrl + argv.name
        request.delete({ url: url }, (err, res) => {
            if (err) {
                console.log(chalk.red(err))
            } else if (res.statusCode >= 400) {
                console.log(chalk.red(res.body))
            } else {
                console.log(chalk.green(res.body))
            }
        })
    }
})

yargs.command({
    command: 'create',
    builder: {
        fileName: {
            demandOption: true,
            type: 'string'
        },
        fileExtension: {
            demandOption: true,
            type: 'string'
        },
        fileContent: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        request.post({ url: baseUrl, body: argv, json: true }, (err, res) => {
            if (err) {
                console.log(chalk.red(err))
            } else if (res.statusCode >= 400) {
                console.log(chalk.red(res.body))
            } else {
                console.log(chalk.green(res.body))
            }
        })
    }
})

yargs.command({
    command: 'update',
    builder: {
        fileName: {
            demandOption: true,
            type: 'string'
        },
        fileExtension: {
            demandOption: true,
            type: 'string'
        },
        fileContent: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let url = baseUrl
        request.put({ url: baseUrl, body: argv, json: true }, (err, res) => {
            if (err) {
                console.log(chalk.red(err))
            } else if (res.statusCode >= 400) {
                console.log(chalk.red(res.body))
            } else {
                console.log(chalk.green(res.body))
            }
        })
    }
})

yargs.parse()