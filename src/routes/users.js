const express = require("express");
const usersRouter = express.Router();
const UserModel = require("../database/models/user");
const query = UserModel.find().select("name -_id");

// Users route
usersRouter.get("/", function (req, res) {
  query.exec(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

module.exports = usersRouter;
