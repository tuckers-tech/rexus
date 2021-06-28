const { readFile } = require('fs-extra');

async function sqlReader(filePath) {
  try {
    const query = await readFile(filePath, { encoding: 'utf-8' });

    return query;
  } catch (err) {
    return false;
  }
}

module.exports = {
  sqlReader,
};
