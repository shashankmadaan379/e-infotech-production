const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const bcrypt = require("bcrypt");
//Register a user --> POST -->/api/v1/registerUser
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all required fields",
        success: false,
      });
    }

    const exstingUser = await User.findOne({ email });
    if (exstingUser) {
      return res.status(403).json({
        success: false,
        message: "User already exist, Please Login !",
      });
    }
    const user = await User.create({ name, email, password });
    sendToken(user, 200, res, "User Registration Successful !");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in the registration process",
      err: error,
    });
  }
};

//Login user --> POST- --> /api/v1/loginUser
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    sendToken(user, 200, res, "User Login Successful !");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in the login process",
      err: error,
    });
  }
};

//Logout ---> /api/v1/logoutUser
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Logout Unsuccessfull !",
      err: error,
    });
  }
};

//Get User Details--> GET ---> /api/v1/getUserDetails/:id
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
      message: "User Details !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Not able to fetch the user details",
      err: error,
    });
  }
};

//Update User Details--> PUT ---> /api/v1/updateUserDetails/:id
exports.updateUserDetails = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      // email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User Details Updated Successfully !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating user details",
      err: error,
    });
  }
};

//Update Password --> PUT ---> /api/v1/updateUserPassword/:id
exports.updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatchedPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isMatchedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Current Password",
      });
    }
    user.password = await bcrypt.hash(req.body.newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Password Not Updated !",
      err: error,
    });
  }
};
