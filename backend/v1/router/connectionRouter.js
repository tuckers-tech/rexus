const express = require('express');
const ConnectionController = require('../controllers/Connection');

const router = express.Router();

const connectionCtrl = new ConnectionController();

router.get('/', (req, res) => {
  res.send('Get Connections');
});

router.get('/:id', (req, res) => {
  res.send(`Get Connections By ID: ${req.params.id}`);
});

router.put('/', (req, res) => {
  res.send('Update Route');
});

router.post('/', (req, res) => {
  connectionCtrl.createConnection();
  res.send('Create Connection');
});

module.exports = router;
