const express = require("express");
const usersRouter = express.Router();
const UserModel = require("../database/models/users");
const query = UserModel.find({}).select();

// Users route
usersRouter.get("/", function (req, res, next) {
  query.exec(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

usersRouter.post("/", (req, res) => {
  const user = new UserModel(req.body);
  const queryExistingUsers = UserModel.find({
    $or: [{ email: user.email }, { _id: user.nickname }],
  });

  queryExistingUsers
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
          //Forward db validation errors
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

usersRouter.get("/:nickname", (req, res) => {
  const nickname = req.params.nickname;

  UserModel.findById(nickname)
    .then((user) => {
      if (user) {
        return res.json(user);
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname: nickname,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

usersRouter.put("/:nickname", (req, res) => {
  const { nickname } = req.params;
  const user = new UserModel(req.body);

  if (user.nickname) {
    return res.status(400).json({
      message: "nickname can't be changed",
      user: user,
    });
  }

  UserModel.findByIdAndUpdate(nickname, req.body, {
    new: true,
    runValidators: true,
  })
    .then((dbUser) => {
      if (dbUser) {
        return res.json({
          message: "User updated successfully",
          user: dbUser,
        });
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname: nickname,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

usersRouter.delete("/:nickname", (req, res) => {
  const { nickname } = req.params;

  UserModel.findByIdAndDelete(nickname)
    .then((user) => {
      if (user) {
        return res.json({
          message: "User deleted successfully",
          user: user,
        });
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname: nickname,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = usersRouter;
