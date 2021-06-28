const express = require('express');
const router = express.Router();

module.exports = async function() {
  const connectionRoutes = await require('./connectionRouter')();

  router.use('/connection', connectionRoutes);

  return router;
};
