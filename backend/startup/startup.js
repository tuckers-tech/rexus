// const fs = require('fs');
const path = require('path');
// const sqlite = require('sqlite3').verbose;

function getDBDir() {
  if (process.env.NODE_ENV === 'development') {
    console.log(__dirname);
    return path.join(__dirname, '..', '..', 'db');
  }
  return path.join('/', 'app', 'db');
}

// function doesDBExist() {}

module.exports = {
  getDBDir,
};
