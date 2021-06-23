const path = require('path');

function getDBPath() {
  if (process.env.NODE_ENV === 'development') {
    return path.join(__dirname, '..', '..', '..', 'db');
  }

  return path.join('/', 'app', 'db');
}

function getSPAPath() {
  if (process.env.NODE_ENV === 'development') {
    return path.join(__dirname, '..', '..', '..', 'static');
  }

  return path.join('/', 'app', 'static');
}

module.exports = {
  getDBPath,
  getSPAPath,
};
