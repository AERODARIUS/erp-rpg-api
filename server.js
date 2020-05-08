require("./src/database");
var express = require("express");
var routes = require("./src/routes");

var server = express();

server.use("/", routes);

server.listen(8000, function () {
  console.log("Server listening on port 8000!");
});
