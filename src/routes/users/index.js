var express = require('express');
var usersRouter = express.Router();

// Users routes
usersRouter.get('/', function(req, res) {
  res.json({allUsers: []});
});

module.exports = usersRouter;
