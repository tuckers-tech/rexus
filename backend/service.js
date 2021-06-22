const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const appRouterV1 = require('./v1/router/index');

const spaLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

async function startService() {
  const app = express();

  app.use('/api/v1', appRouterV1);

  app.use('/status', (req, res) => {
    res.json({
      status: 'green',
    });
  });
  const staticPath = path.join('/', 'app', 'static');

  app.use(express.static(staticPath));

  app.use('/', spaLimiter, (req, res) => {
    res.sendFile('index.html');
  });

  return app;
}

module.exports = {
  startService,
};
