const chalk = require('chalk');
const constants = require('../data/constants');

const log = (logData) => {
  if (!logData.code) {
    console.log(logData);
  } else if (logData.code < constants.codes.error) {
    console.log(chalk.green(logData.message));
  } else {
    console.log(chalk.red(logData.message));
  }
};

module.exports = { log };
