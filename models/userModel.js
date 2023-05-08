const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  JWT_EXPIRES_TIME,
  JWT_ACCESS_TOKEN,
} = require("../config/serverConfig");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false,
    },
  },
  { timestamps: true }
);

//hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = async function () {
  return jwt.sign({ id: this._id }, JWT_ACCESS_TOKEN, {
    expiresIn: JWT_EXPIRES_TIME,
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
