var app = require("./src/app");

const server = app.listen(8000, function () {
  console.log("Server listening on port 8000!");
});

module.exports = server;
