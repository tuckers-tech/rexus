const DBControllerFactory = require('../db/DBControllerFactory');
const Logger = require('../parents/Logger');

class ConnectionController extends Logger {
  constructor() {
    super('ConnectionController');
  }

  async init() {
    this.dbCtrl = await DBControllerFactory();
  }

  createConnection() {
    this.logInfo('Create Connection');
  }

  removeConnection() {}

  getAllConnections() {}

  getConnectionByID() {}
}

module.exports = ConnectionController;
