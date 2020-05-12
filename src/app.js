var bodyParser = require("body-parser");

const database = require("./database");
var express = require("express");
var routes = require("./routes");
var app = express();


database.connect();

app.use(bodyParser.raw({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

module.exports = app;
