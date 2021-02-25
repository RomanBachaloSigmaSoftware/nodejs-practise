const request = require('request');
const yargs = require('yargs');
const constants = require('../data/constants');
const logService = require('../log-service/logService');

const port = constants.port;
const baseUrl = `http://localhost:${port}/fs/`;

yargs.command({
    command: 'get',
    builder: {
        name: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let url = baseUrl + argv.name;
        request({ url: url }, (err, res) => {
            if (err) {
                logService.log({ message: err, code: constants.codes.error });
            } else if (res.statusCode >= constants.codes.error) {
                logService.log({ message: res.body, code: constants.codes.error });
            } else {
                logService.log({ message: res.body, code: constants.codes.success });
            }
        });
    }
});

yargs.command({
    command: 'delete',
    builder: {
        name: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let url = baseUrl + argv.name;
        request.delete({ url: url }, (err, res) => {
            if (err) {
                logService.log({ message: err, code: constants.codes.error });
            } else if (res.statusCode >= constants.codes.error) {
                logService.log({ message: res.body, code: constants.codes.error });
            } else {
                logService.log({ message: res.body, code: constants.codes.success });
            }
        });
    }
});

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
                logService.log({ message: err, code: constants.codes.error });
            } else if (res.statusCode >= constants.codes.error) {
                logService.log({ message: res.body, code: constants.codes.error });
            } else {
                logService.log({ message: res.body, code: constants.codes.success });
            }
        });
    }
});

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
        request.put({ url: baseUrl, body: argv, json: true }, (err, res) => {
            if (err) {
                logService.log({ message: err, code: constants.codes.error });
            } else if (res.statusCode >= constants.codes.error) {
                logService.log({ message: res.body, code: constants.codes.error });
            } else {
                logService.log({ message: res.body, code: constants.codes.success });
            }
        });
    }
});

yargs.parse();