const path = require('path');
const { writeFile } = require('fs-extra');
const morgan = require('morgan');
const { getSPAPath } = require('../v1/helpers/directories');
const { logError, logInfo } = require('../v1/helpers/logger');

function startLogger(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  return app;
}

async function setApplicationLocation() {
  const applicationURL = process.env.REXUS_APPLICATION_URL;
  if (applicationURL) {
    try {
      logInfo(
        'startup.js',
        'Writing application URL to applicationLocation.js',
      );
      await writeFile(
        path.join(getSPAPath(), 'applicationLocation.js'),
        `window.API_LOCATION = '${applicationURL}';`,
      );
    } catch (err) {
      logError('startup.js', 'Unable to write Application Location File');
    }
  }
}

module.exports = {
  startLogger,
  setApplicationLocation,
};
