const chalk = require('chalk');
const constants = require('../data/constants');

const log = (logData) => {
  if (!logData.code) {
    console.log(logData);
  } else if (logData.code < constants.codes.error) {
    console.log(chalk.green(logData.message));
  } else {
    console.log(chalk.yellow(logData.message));
  }
};

const error = (errorData, response) => {
  console.log(chalk.red(errorData));

  if (response)
    response.send(errorData)
  else
    throw errorData;
};

module.exports = { log, error };
