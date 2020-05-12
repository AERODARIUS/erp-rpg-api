const express = require("express");
const usersRouter = express.Router();
const UserModel = require("../database/models/users");
const query = UserModel.find({}).select("nickname name");

// Users route
usersRouter.get("/", function (req, res, next) {
  query.exec(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

usersRouter.post("/", (req, res) => {
  const user = new UserModel(req.body);
  const queryExistingUser = UserModel.find({
    $or: [{ email: user.email }, { nickname: user.nickname }],
  });

  queryExistingUser
    .exec()
    .then((dbUsers) => {
      if (dbUsers.length > 0) {
        const dbUser = dbUsers[0];

        return res.status(400).json({
          error: `User already exists, choose a different ${
            dbUser.email === user.email ? "email" : "nickname"
          }`,
        });
      }

      user
        .save()
        .then((user) => {
          res.json({
            message: "User added successfully",
            user: user,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

usersRouter.put("/:nickname", (req, res) => {
  // TODO: Impement update existent user
  const { id } = req.params;
  //res.json(req.body);
  res.status(501).send("Not implemented yet");
});

usersRouter.delete("/:nickname", (req, res) => {
  // TODO: Implement deleting an existent user
  const { id } = req.params;
  // code to delete an article...
  //res.json({ deleted: id });
  res.status(501).send("Not implemented yet");
});

module.exports = usersRouter;
