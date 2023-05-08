// Create and send token and save in the cookie
const { JWT_COOKIE_EXPIRE } = require("../config/serverConfig");
const sendToken = async (user, statusCode, res, message) => {
  //create jwt token
  const token = await user.getJwtToken();
  //options for cookie
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: "none",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message,
  });
};
module.exports = sendToken;
