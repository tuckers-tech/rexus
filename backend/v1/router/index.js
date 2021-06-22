const express = require('express');
const router = express.Router();

const connectionRoutes = require('./connectionRouter');

router.use('/connection', connectionRoutes);

module.exports = router;
