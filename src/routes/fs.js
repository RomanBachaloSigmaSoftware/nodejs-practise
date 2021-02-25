const express = require('express');
const fs = require('fs');
const logService = require('../log-service/logService');

const router = express.Router();

async function get(name, response) {
  const existsPromise = new Promise((resolve, reject) => {
    fs.exists(name, (exists) => {
      if (exists) resolve(name);

      reject(`${name} does not exist`);
    });
  });

  existsPromise.then(() => fs.readFile(name, (error, data) => {
    if (error) logService.error(error);

    response.send(data);
  })).catch((error) => logService.error(error, response));
}

async function deleteFile(name, response) {
  const existsPromise = new Promise((resolve, reject) => {
    fs.exists(name, (exists) => {
      if (exists) resolve(name);

      reject(`${name} does not exist`);
    });
  });

  existsPromise.then(() => fs.unlink(name, (error) => {
    if (error) logService.error(error);

    response.send(`${name} deleted`);
  })).catch((error) => logService.error(error, response));
}

async function createFile(name, content, response) {
  const existsPromise = new Promise((resolve, reject) => {
    fs.exists(name, (exists) => {
      if (!exists) resolve({ name, content });

      reject(`${name} already exists`);
    });
  });

  existsPromise.then((file) => {
    fs.writeFile(file.name, file.content, (err) => {
      if (err) logService.error(err);

      response.send(`${file.name} has been created`);
    });
  }).catch((error) => logService.error(error, response));
}

async function updateFile(name, content, response) {
  const existsPromise = new Promise((resolve, reject) => {
    fs.exists(name, (exists) => {
      if (exists) resolve({ name, content });

      reject(`${name} does not exist`);
    });
  });

  existsPromise.then((file) => {
    fs.writeFile(file.name, file.content, (err) => {
      if (err) logService.error(err);

      response.send(`${file.name} has been updated`);
    });
  }).catch((error) => logService.error(error, response));
}

router.get('/:fileName', async (req, res) => get(req.params.fileName, res));

router.delete('/:fileName', async (req, res) => deleteFile(req.params.fileName, res));

router.post('/', async (req, res) => {
  const documentValues = req.body;
  const file = `${documentValues.fileName}.${documentValues.fileExtension}`;

  createFile(file, documentValues.fileContent, res);
});

router.put('/', async (req, res) => {
  const documentValues = req.body;
  const file = `${documentValues.fileName}.${documentValues.fileExtension}`;

  updateFile(file, documentValues.fileContent, res);
});

module.exports = router;
