const path = require('path');
const { pathExists } = require('fs-extra');

function getDBPath() {
  if (process.env.NODE_ENV === 'development') {
    return path.join(__dirname, '..', '..', '..', 'db');
  }

  return path.join('/', 'app', 'db');
}

module.exports = {
  getDBPath,
};
