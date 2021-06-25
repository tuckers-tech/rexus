const DBControllerFactory = require('../db/DBControllerFactory');
const path = require('path');
const Logger = require('../parents/Logger');
const redis = require('redis');
const { sqlReader } = require('../db/sqlReader');
const { getSQLPath } = require('../helpers/directories');

const createConnectionPath = path.join(
  getSQLPath(),
  'queries',
  'connection',
  'CreateConnection.sql',
);

const getAllConnectionsPath = path.join(
  getSQLPath(),
  'queries',
  'connection',
  'GetAllConnections.sql',
);

class ConnectionController extends Logger {
  constructor() {
    super('ConnectionController');
  }

  async init() {
    this.dbCtrl = await DBControllerFactory();
  }

  async createConnection(newConnection) {
    try {
      const query = await sqlReader(createConnectionPath);

      const args = {
        $name: newConnection.name,
        $host: newConnection.host,
        $port: newConnection.port,
      };

      const result = await this.dbCtrl.runInsert(query, args);
      return {
        ...newConnection,
        id: result.lastID,
      };
    } catch (err) {
      return false;
    }
  }

  removeConnection() {}

  async getAllConnections() {
    try {
      const query = await sqlReader(getAllConnectionsPath);

      const result = await this.dbCtrl.runQuery(query);
      return result;
    } catch (err) {
      return false;
    }
  }

  getConnectionByID() {}

  testConnection(connection) {
    return new Promise((resolve, reject) => {
      const client = redis.createClient({
        host: connection.host,
        port: connection.port,
      });

      client.on('connect', function() {
        client.quit();
        resolve(true);
      });
      client.on('error', function(error) {
        client.quit();
        reject(error);
      });
    });
  }
}

module.exports = ConnectionController;
