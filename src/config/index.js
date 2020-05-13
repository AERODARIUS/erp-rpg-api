const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

function getConfigByEnv() {
  const config = {
    port: parseInt(process.env.PORT, 10),
    databaseURL: process.env.MONGODB_URI,
    SALT_WORK_FACTOR: 10,
  };

  if (process.env.NODE_ENV === "test") {
    config.databaseURL = process.env.MONGODB_TEST_URI;
  }

  return config;
}

module.exports = getConfigByEnv();
