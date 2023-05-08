const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConfig");
const ApiRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const setupAndStartServer = async () => {
  const app = express();

  //middlewares
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use("/api", ApiRoutes);
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Credentials", true);
  //   next();
  // });

  //static files
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });

  connectDB();
};

setupAndStartServer();
