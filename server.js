const database = require("./src/database");
const app = require("./src/app");

database.connect();

const server = app.listen(8000);

module.exports = server;
