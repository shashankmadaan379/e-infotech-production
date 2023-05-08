const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require("../config/serverConfig");
const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login to access this resource",
      });
    }

    const decode = jwt.verify(token, JWT_ACCESS_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is Invalid",
    });
  }
};

module.exports = isAuthenticatedUser;
