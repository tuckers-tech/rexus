const path = require('path');
const sqlite = require('sqlite3');
const { ensureDir, pathExists } = require('fs-extra');
const Logger = require('../parents/Logger');

class DBController extends Logger {
  constructor(dbPath) {
    super('DBController');
    this.dbPath = dbPath;
  }

  async init() {
    await ensureDir(this.dbPath);

    const dbFilePath = path.join(this.dbPath, 'rexus.db');

    const result = await pathExists(dbFilePath);

    this.freshDB = !result;

    this.db = new sqlite.Database(dbFilePath, (err) => {
      if (err) {
        this.logError('Unable to Create DB File');
        this.logError(err);
      } else {
        if (this.freshDB) {
          this.logInfo('Created DB File');
        } else {
          this.logInfo('Loading Existing DB File');
        }
      }
    });
  }
}

module.exports = DBController;
