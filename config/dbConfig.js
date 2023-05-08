const mongoose = require("mongoose");
const { MONGO_DATABASE } = require("./serverConfig");
const connectDB = async () => {
  mongoose
    .connect(MONGO_DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with Host:${con.connection.host} `
      );
    });
};

module.exports = connectDB;
