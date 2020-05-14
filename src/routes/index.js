const express = require("express");

const router = express.Router();
const v1 = require("./v1");

router.use("/api/v1", v1);
router.use("/api", v1); // Default version (current/latest)

// ERP-RPG home page with brief description
router.get("/", (req, res) => {
  res.send("Here starts your journey.");
});

// Catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error("Not Found??");
  err.status = 404;
  return next(err);
});

module.exports = router;
