const express = require("express");
const UserModel = require("../../database/models/users");

const usersRouter = express.Router();

// List all users
usersRouter.get("/", (req, res, next) => {
  UserModel.list()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      next(error);
    });
});

// Show user data if exists
usersRouter.get("/:nickname", (req, res, next) => {
  const { nickname } = req.params;

  UserModel.find([{ name: "nickname", value: nickname }])
    .then((dbUsers) => {
      if (dbUsers.length === 0) {
        res.status(404).json({
          message: "User doesn't exist",
          nickname,
        });
      }

      if (dbUsers.length > 1) {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(200).send(dbUsers[0]);
    })
    .catch((error) => {
      next(error);
    });
});

// Create user if not exists
usersRouter.post("/", (req, res, next) => {
  // Check for unique constraints and save to database
  UserModel.add(req.body)
    .then((savedUser) => {
      res.status(201).json({
        message: "User added successfully",
        savedUser,
      });
    })
    .catch((error) => next(error));
});

// Update user if exists
usersRouter.put("/:nickname", (req, res, next) => {
  const { nickname } = req.params;

  UserModel.update(nickname, req.body)
    .then((savedUser) => {
      res.status(200).send({
        message: "User updated successfully",
        user: savedUser,
      });
    })
    .catch((error) => next(error));
});


// Delete user if exists
usersRouter.delete("/:nickname", (req, res, next) => {
  const { nickname } = req.params;

  UserModel.delete(nickname)
    .then((deletedUsers) => {
      if (deletedUsers.length > 0) {
        res.json({
          message: "User deleted successfully",
          deletedUser: deletedUsers[0],
        });

        return;
      }

      res.status(404).json({
        message: "User doesn't exist",
        nickname,
      });
    })
    .catch((error) => next(error));
});

module.exports = usersRouter;
