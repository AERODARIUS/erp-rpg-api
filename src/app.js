const database = require("./database");
var express = require("express");
var routes = require("./routes");

var app = express();
database.connect();

app.use("/", routes);

module.exports = app;
