const bodyParser = require("body-parser");

const express = require("express");
const routes = require("./routes");

const app = express();

app.use(bodyParser.raw({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

module.exports = app;
