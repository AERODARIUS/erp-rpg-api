require("./src/database");
var express = require("express");
var routes = require("./src/routes");

var app = express();

app.use("/", routes);

const server = app.listen(8000, function () {
  console.log("Server listening on port 8000!");
});

module.exports = server;
