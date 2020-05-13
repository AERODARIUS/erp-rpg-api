const express = require("express");

const router = express.Router();
const usersRouter = require("./users");

router.use("/users", usersRouter);

// ERP-RPG Home page
router.get("/", (req, res) => {
  res.send("Here start your journey.");
});

// Catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error("Not Found??");
  err.status = 404;
  return next(err);
});

module.exports = router;
