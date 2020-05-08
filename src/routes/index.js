var express = require('express');
var router = express.Router();
var usersRouter = require('./users');

router.use('/users', usersRouter);

// ERP-RPG Home page
router.get('/', function(req, res) {
  res.send('Here start your journey.');
});

/// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found??');
  err['status'] = 404;
  next(err);
});

module.exports = router;
