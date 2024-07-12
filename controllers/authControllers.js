const User = require("../models/User");
const CustomAPIError = require("../errors");
const jwt = require("jsonwebtoken");
const { attachCookieToResponse } = require("../utils");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomAPIError.BadRequestError(
      `Email: ${email} already exists. Please choose another value for email`
    );
  }

  const isFirstAccount = (await User.countDocuments({})) == 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookieToResponse(res, tokenUser)
  
  return res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  return res.send("login user");
};

const logout = async (req, res) => {
  return res.send("logout user");
};

module.exports = { register, login, logout };
