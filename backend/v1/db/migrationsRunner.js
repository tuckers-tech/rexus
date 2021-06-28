const path = require('path');
const { readdir, readFile } = require('fs-extra');
const { getSQLPath } = require('../helpers/directories');
const { logError } = require('../helpers/logger');

const migrationPath = path.join(getSQLPath(), 'migrations');

async function getMigrationList() {
  try {
    const result = await readdir(migrationPath);

    return result.map((fileName) => fileName.slice(0, -4));
  } catch (err) {
    logError('migrationRunner.js', 'Unable to Read Migration Path');
    logError('migrationRunner.js', err);
  }
}

async function runMigration(dbInstance) {
  // TODO(TUCKER) - Determine which files to run, right now we just run them all in order
  try {
    const migrationList = await getMigrationList();

    migrationList.forEach(async (fileName) => {
      const targetFile = path.join(migrationPath, `${fileName}.sql`);
      const fileContents = await readFile(targetFile, { encoding: 'utf-8' });
      await dbInstance.exec(fileContents);
    });

    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  runMigration,
};
