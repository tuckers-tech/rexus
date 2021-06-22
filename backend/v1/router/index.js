const express = require('express');
const router = express.Router();

router.use('/status', (req, res) => {
  res.json({
    status: 'green',
  });
});

module.exports = router;
