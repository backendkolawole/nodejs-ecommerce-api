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
  attachCookieToResponse(res, tokenUser);

  return res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError.BadRequestError(
      `Please enter values for email and password`
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomAPIError.UnauthenticatedError(`Invalid credentials`);
  }

  const isCorrect = await user.comparePasswords(password);
  if (!isCorrect) {
    throw new CustomAPIError.UnauthenticatedError(`Invalid credentials`);
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookieToResponse(res, tokenUser);

  return res.status(201).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  });
  return res.status(200).json({ msg: `User logged out` });
};

module.exports = { register, login, logout };
