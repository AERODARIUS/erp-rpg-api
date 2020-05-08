const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/erp-rpg", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
