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
    DB_CONNECTION: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      max: 30,
    },
    SALT_WORK_FACTOR: 10, // For passowrd enconding
    PAGE_SIZE: 20,
  };

  /* TODO:
  if (process.env.NODE_ENV === "test") {
    config.DATABASE_URL = process.env.TEST_DATABASE_URI;
  }
  */

  return config;
}

module.exports = getConfigByEnv();
