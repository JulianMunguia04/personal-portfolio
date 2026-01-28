const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Contact route works!' });
});

module.exports = router;
