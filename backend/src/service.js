const express = require('express');
const path = require('path');

async function startService() {
  const app = express();

  const staticPath = path.join('/', 'app', 'static');

  app.use(express.static(staticPath));

  app.use('/api/v1/status', (req, res) => {
    res.json({
      status: 'green',
    });
  });

  app.use('/', (req, res) => {
    res.sendFile('index.html');
  });

  return app;
}

module.exports = {
  startService,
};
