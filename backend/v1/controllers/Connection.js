const DBControllerFactory = require('../db/DBControllerFactory');

class ConnectionController {
  constructor() {
    this.dbCtrl = DBControllerFactory();
  }

  createConnection() {
    console.log('Create Connection');
  }

  removeConnection() {}

  getAllConnections() {}

  getConnectionByID() {}
}

module.exports = ConnectionController;
