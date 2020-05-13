const bodyParser = require("body-parser");

const express = require("express");
const database = require("./database");
const routes = require("./routes");

const app = express();


database.connect();

app.use(bodyParser.raw({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

module.exports = app;
