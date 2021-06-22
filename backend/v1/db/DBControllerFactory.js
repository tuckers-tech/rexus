const { getDBPath } = require('../helpers/directories');
const DBController = require('./DBController');

let dbController;

async function DBControllerFactory() {
  if (dbController) {
    return dbController;
  }

  dbController = new DBController(getDBPath());

  await dbController.init();

  return dbController;
}

module.exports = DBControllerFactory;
