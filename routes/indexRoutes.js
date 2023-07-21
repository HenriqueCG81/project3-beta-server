const router = require('express').Router();

router.get('/login', (req, res, next) => {
  res.json('All good in here');
});

module.exports = router;
