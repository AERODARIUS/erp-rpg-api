const mongoose = require("mongoose");
const config = require("../config");

function connect() {
  return mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

function disconnect(done) {
  return mongoose.connection.close(done);
}

module.exports = {
  connect,
  disconnect,
};
