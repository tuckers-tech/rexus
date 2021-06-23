const DBControllerFactory = require('../db/DBControllerFactory');
const Logger = require('../parents/Logger');
const redis = require('redis');

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

  testConnection(connection) {
    return new Promise((resolve, reject) => {
      const client = redis.createClient({
        host: connection.host,
        port: connection.port,
      });

      client.on('connect', function() {
        console.log(client.server_info);
        client.quit();
        resolve(true);
      });
      client.on('error', function(error) {
        console.log(error);
        client.quit();
        reject(error);
      });
    });
  }
}

module.exports = ConnectionController;
