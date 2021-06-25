const path = require('path');
const sqlite = require('sqlite3');
const { ensureDir, pathExists } = require('fs-extra');
const Logger = require('../parents/Logger');
const { runMigration } = require('./migrationsRunner');
const { logError } = require('../helpers/logger');

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

    this.db = new sqlite.Database(dbFilePath, async (err) => {
      if (err) {
        this.logError('Unable to Create DB File');
        this.logError(err);
      } else {
        if (this.freshDB) {
          this.logInfo('Created DB File');
          await this.createDB();
        } else {
          this.logInfo('Loading Existing DB File');
          await this.migrateDB();
        }
      }
    });
  }

  runQuery(query, args) {
    return new Promise((resolve, reject) => {
      this.db.run(query, args, function(err) {
        if (err) {
          logError('DBController.js - callback', err);
          reject(err);
        }

        resolve({
          changes: this.changes,
          lastID: this.lastID,
        });
      });
    });
  }

  async createDB() {
    runMigration(this.db);
  }

  async migrateDB() {
    this.logWarn('Implement migrateDB()');
  }
}

module.exports = DBController;
