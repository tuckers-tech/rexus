const DBControllerFactory = require('../db/DBControllerFactory');
const path = require('path');
const redis = require('redis');
const { sqlReader } = require('../db/sqlReader');
const { getSQLPath } = require('../helpers/directories');
const WebSocketController = require('../parents/WebSocketController');

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

const getConnectionByIDPath = path.join(
  getSQLPath(),
  'queries',
  'connection',
  'GetConnectionById.sql',
);

class ConnectionController extends WebSocketController {
  constructor() {
    super('ConnectionController');
    this.liveConnections = [];
    this.activeConnections = [];
  }

  async init() {
    this.dbCtrl = await DBControllerFactory();
    await this.initWSController();
    this.liveConnections = [];
  }

  onGetWSMessage(message) {
    console.log(message);
    this.ws.send('response');
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
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

  convertQueryKeys(data) {
    return data.map((row) => ({
      id: row.con_id,
      name: row.con_name,
      host: row.con_host,
      port: row.con_port,
    }));
  }

  async connect(connectionID) {
    const targetConnection = await this.getConnectionByID(connectionID);

    if (targetConnection.length === 0) {
      return {
        success: false,
        code: 404,
        message: 'Unable To Find Connection',
      };
    }

    const currentActiveConnections = this.activeConnections.map((connection) =>
      parseInt(connection.connectionID, 10),
    );

    if (currentActiveConnections.includes(parseInt(connectionID, 10))) {
      return {
        success: true,
      };
    }

    const client = redis.createClient({
      host: targetConnection.host,
      port: targetConnection.port,
    });

    client.monitor((err) => {
      if (err) {
        return {
          success: false,
          code: 500,
          message: 'Error Monitoring',
        };
      }
    });

    client.on('monitor', (time, args, rawReply) => {
      this.sendMessage({
        connectionID,
        message: {
          time,
          args,
          rawReply,
        },
      });
    });

    this.activeConnections.push({
      connectionID,
      client,
    });

    return {
      success: true,
    };
  }

  async disconnect(connectionID) {
    try {
      const newActiveConnections = [];
      this.activeConnections.forEach((connection) => {
        if (connection.connectionID !== connectionID) {
          newActiveConnections.push(connection);
        } else {
          connection.client.end(true);
        }
      });

      this.activeConnections = newActiveConnections;

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        code: 500,
        message: 'Error Monitoring',
      };
    }
  }

  getActiveConnections() {
    return this.activeConnections;
  }

  async getAllConnections() {
    try {
      const query = await sqlReader(getAllConnectionsPath);

      const result = await this.dbCtrl.runQuery(query);
      return result;
    } catch (err) {
      return false;
    }
  }

  async getConnectionByID(targetID) {
    try {
      const query = await sqlReader(getConnectionByIDPath);

      const result = await this.dbCtrl.runQuery(query, { $con_id: targetID });

      return this.convertQueryKeys(result);
    } catch (err) {
      return false;
    }
  }

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

let connectionCtrl;

async function getConnectionController() {
  if (connectionCtrl) {
    return connectionCtrl;
  }

  connectionCtrl = new ConnectionController();

  await connectionCtrl.init();

  return connectionCtrl;
}

module.exports = getConnectionController;
