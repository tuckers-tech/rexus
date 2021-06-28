const { logInfo, logSuccess, logWarn, logError } = require('../helpers/logger');

class Logger {
  constructor(source) {
    this.source = source;
  }

  logInfo(content) {
    logInfo(this.source, content);
  }

  logSuccess(content) {
    logSuccess(this.source, content);
  }

  logWarn(content) {
    logWarn(this.source, content);
  }

  logError(content) {
    logError(this.source, content);
  }
}

module.exports = Logger;
