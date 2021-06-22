const DBController = require('./DBController');

let dbController;

function DBControllerFactory() {
  if (dbController) return dbController;

  dbController = new DBController();

  return dbController;
}

module.exports = DBControllerFactory;
