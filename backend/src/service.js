const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');

const spaLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

async function startService() {
  const app = express();

  const staticPath = path.join('/', 'app', 'static');

  app.use(express.static(staticPath));

  app.use('/api/v1/status', (req, res) => {
    res.json({
      status: 'green',
    });
  });

  app.use('/', spaLimiter, (req, res) => {
    res.sendFile('index.html');
  });

  return app;
}

module.exports = {
  startService,
};
