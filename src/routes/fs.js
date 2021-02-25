const express = require('express');
const logService = require('../log-service/logService');
const fs = require('fs');

const router = express.Router();
const constants = require('../data/constants');

router.delete('/:fileName', (req, res) => {
  fs.exists(req.params.fileName, (exists) => {
    if (exists) {
      fs.unlink(req.params.fileName, (err) => {
        if (err) {
          res.statusCode = constants.codes.error;
          res.send(`Unable to delete ${req.params.fileName}`);
          logService.error(err);
        } else {
          res.send(`${req.params.fileName} deleted`);
        }
      });
    } else {
      res.statusCode = constants.codes.error;
      res.send(`${req.params.fileName} does not exist`);
    }
  });
});

router.post('/', (req, res) => {
  const documentValues = req.body;
  const file = `${documentValues.fileName}.${documentValues.fileExtension}`;
  fs.exists(file, (exists) => {
    if (exists) {
      res.statusCode = constants.codes.error;
      res.send(`${file} already exists`);
    } else {
      fs.writeFile(file, documentValues.fileContent, (err) => {
        if (err) logService.error(err);
        res.send(`${file} has been created`);
      });
    }
  });
});

router.put('/', (req, res) => {
  const documentValues = req.body;
  const file = `${documentValues.fileName}.${documentValues.fileExtension}`;
  fs.exists(file, (exists) => {
    if (exists) {
      fs.writeFile(file, documentValues.fileContent, (err) => {
        if (err) logService.error(err);
        res.send(`${file} has been updated`);
      });
    } else {
      res.statusCode = constants.codes.error;
      res.send(`${file} does not exist`);
    }
  });
});

router.get('/:fileName', (req, res) => {
  fs.exists(req.params.fileName, (exists) => {
    if (exists) {
      fs.readFile(req.params.fileName, (err, data) => {
        if (err) logService.error(err);
        res.send(data);
      });
    } else {
      res.statusCode = constants.codes.error;
      res.send(`${req.params.fileName} does not exist`);
    }
  });
});

module.exports = router;
