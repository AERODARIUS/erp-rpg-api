const express = require("express");

const usersRouter = express.Router();
const UserModel = require("../../database/models/users");

const query = UserModel.find({}).select();

// List all users
usersRouter.get("/", (req, res, next) => {
  query.exec((err, docs) => {
    if (err) {
      next(err);
      return;
    }

    res.send(docs);
  });
});

// Create user
usersRouter.post("/", (req, res, next) => {
  const user = new UserModel(req.body);

  // Check for unique constraints
  UserModel.find({
    $or: [{ email: user.email }, { _id: user.nickname }],
  })
    .then((dbUsers) => {
      if (dbUsers.length > 0) {
        const dbUser = dbUsers[0];

        res.status(400).json({
          error: `User already exists, choose a different ${
            dbUser.email === user.email ? "email" : "nickname"
          }`,
        });
        return;
      }

      // Save to database if not exists
      user
        .save()
        .then((savedUser) => {
          res.status(201).json({
            message: "User added successfully",
            savedUser,
          });
        })
        .catch((err) => {
          res.status(400).json(err);
          return next(err);
        });
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
      return next(err);
    });
});


// Show user data if exists
usersRouter.get("/:nickname", (req, res, next) => {
  const { nickname } = req.params;

  UserModel.findById(nickname)
    .then((user) => {
      if (user) {
        res.json(user);
        return;
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname,
      });
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
      return next(err);
    });
});

// Update user data
usersRouter.put("/:nickname", (req, res, next) => {
  const { nickname } = req.params;
  const user = new UserModel(req.body);

  if (user.nickname) {
    res.status(400).json({
      message: "nickname can't be changed",
      user,
    });
    return;
  }

  // Update if exists
  UserModel.findByIdAndUpdate(nickname, req.body, {
    new: true,
    runValidators: true,
  })
    .then((dbUser) => {
      if (dbUser) {
        res.json({
          message: "User updated successfully",
          user: dbUser,
        });

        return;
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname,
      });
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
      return next(err);
    });
});


// Delete user
usersRouter.delete("/:nickname", (req, res, next) => {
  const { nickname } = req.params;

  // Delete if exists
  UserModel.findByIdAndDelete(nickname)
    .then((user) => {
      if (user) {
        res.json({
          message: "User deleted successfully",
          user,
        });

        return;
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname,
      });
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
      return next(err);
    });
});

module.exports = usersRouter;
