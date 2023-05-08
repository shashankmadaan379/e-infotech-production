const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
  updateUserPassword,
} = require("../../controllers/authController");
const isAuthenticatedUser = require("../../middlewares/authentication");
const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/logoutUser", logoutUser);
router.get("/getUserDetails/:id", getUserDetails);
router.put("/updateUserDetails/:id", updateUserDetails);
router.put("/updateUserPassword/:id", updateUserPassword);
module.exports = router;
