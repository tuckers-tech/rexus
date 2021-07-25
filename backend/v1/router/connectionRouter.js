const express = require('express');
const getConnectionController = require('../controllers/ConnectionController');
const router = express.Router();

module.exports = async function() {
  const connectionCtrl = await getConnectionController();

  router.get('/', async (req, res) => {
    const allConnections = await connectionCtrl.getAllConnections();
    if (!allConnections) {
      res.json({
        success: false,
      });
    }
    res.status(200).json(allConnections);
  });

  router.get('/active', (req, res) => {
    const activeConnections = connectionCtrl.getActiveConnections();

    res.send(
      activeConnections.map((connection) =>
        parseInt(connection.connectionID, 10),
      ),
    );
  });

  router.get('/:id', async (req, res) => {
    const connection = await connectionCtrl.getConnectionByID(req.params.id);
    if (!connection) {
      res.json({
        success: false,
      });
    }

    const foundResult = connection[0];

    if (foundResult) {
      res.status(200).json(foundResult);
    } else {
      res
        .status(404)
        .send(`Unable to find connection with ID: ${req.params.id}`);
    }
  });

  router.post('/:id/connect', async (req, res) => {
    const connectionResult = await connectionCtrl.connect(req.params.id);

    if (connectionResult.success) {
      res.send(true);
    } else {
      res.status(connectionResult.code).send(connectionResult.message);
    }
  });

  router.put('/', (req, res) => {
    res.send('Update Route');
  });

  router.post('/', async (req, res) => {
    const newConnection = await connectionCtrl.createConnection(req.body);
    if (!newConnection) {
      res.json({
        success: false,
      });
    }
    res.status(201).json(newConnection);
  });

  router.post('/test', async (req, res) => {
    const connection = req.body;

    try {
      const testResults = await connectionCtrl.testConnection(connection);
      res.json({
        connectionValid: testResults,
      });
    } catch (err) {
      res.json({
        connectionValid: false,
      });
    }
  });

  return router;
};
