const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MODE: process.env.MODE,
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
  JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
};
