const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { startLogger, setApplicationLocation } = require('./startup/startup');
const { getSPAPath } = require('./v1/helpers/directories');
const { getWSS } = require('./v1/websocket/websocket');

const spaLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 500, // start blocking after 500 requests
  message: 'Too many requests from this IP',
});

class Service {
  constructor() {
    this.app = express();
  }

  async startService() {
    await setApplicationLocation();

    startLogger(this.app);

    this.app.use(express.json());
    this.app.use(cors());

    const appRouterV1 = await require('./v1/router')();

    this.app.use('/api/v1', appRouterV1);

    this.app.use('/status', (req, res) => {
      res.json({
        status: 'green',
      });
    });

    this.app.use(express.static(getSPAPath()));

    this.app.use('/', spaLimiter, (req, res) => {
      res.sendFile('index.html');
    });
  }
}

module.exports = Service;
