const chalk = require('chalk');

const logSource = process.env.REXUS_LOG_LEVEL === 'verbose' ? true : false;

exports.logSuccess = (source, contentToLog) => {
  console.log(
    `${chalk.greenBright('[SUCCESS]')} :: ${
      logSource ? chalk.gray(source) + ' :: ' : ''
    }${chalk.whiteBright(contentToLog)}`,
  );
};

exports.logInfo = (source, contentToLog) => {
  console.log(
    `${chalk.blueBright('[INFO]')} :: ${
      logSource ? chalk.gray(source) + ' :: ' : ''
    }${chalk.whiteBright(contentToLog)}`,
  );
};

exports.logError = (source, contentToLog) => {
  console.error(
    `${chalk.blueBright('[ERROR]')} :: :: ${
      logSource ? chalk.gray(source) + ' :: ' : ''
    }${chalk.whiteBright(contentToLog)}`,
  );
};

exports.logWarn = (source, contentToLog) => {
  console.warn(
    `${chalk.yellowBright('[WARN]')} :: :: ${
      logSource ? chalk.gray(source) + ' :: ' : ''
    }${chalk.whiteBright(contentToLog)}`,
  );
};
