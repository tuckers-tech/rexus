const DBControllerFactory = require('../db/DBControllerFactory');
const path = require('path');
const Logger = require('../parents/Logger');
const redis = require('redis');
const { sqlReader } = require('../db/sqlReader');
const { getSQLPath } = require('../helpers/directories');

const queryPath = path.join(
  getSQLPath(),
  'queries',
  'connection',
  'CreateConnection.sql',
);

class ConnectionController extends Logger {
  constructor() {
    super('ConnectionController');
  }

  async init() {
    this.dbCtrl = await DBControllerFactory();
  }

  async createConnection(newConnection) {
    console.log(newConnection);
    try {
      const query = await sqlReader(queryPath);

      const args = {
        $name: newConnection.name,
        $host: newConnection.host,
        $port: newConnection.port,
      };

      const result = await this.dbCtrl.runQuery(query, args);
      return {
        ...newConnection,
        id: result.lastID,
      };
    } catch (err) {
      return false;
    }
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
