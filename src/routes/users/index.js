var express = require("express");
var usersRouter = express.Router();
var userModel = require("../../database/models/user");

// Users route
usersRouter.get("/", function (req, res) {
  userModel.find(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

module.exports = usersRouter;
