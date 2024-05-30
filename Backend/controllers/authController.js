const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const createToken = (user) => {
  return jwt.sign(
    { email: user.email, userId: user._id },
    process.env.SECRECT,
    { expiresIn: "1h" }
  );
};
exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Authentication Failed!",
      errors: errors.array(),
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Authentication Failed!");

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) throw new Error("Authentication Failed!");

    const token = createToken(user);


    return res.status(200).json({
      message: "Successfully Login!",
      userId: user._id,
      userEmail: user.email,
      token,
    });

    // const user = await User.create({ email, username, password: hashPassword });
  } catch (err) {
    next(err);
  }
};

exports.Register = async (req, res, next) => {
  const { email, username, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Authentication Failed!",
      errors: errors.array(),
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashPassword });

    const token = createToken(user);
    return res.status(200).json({
      message: "Successfully Register!",
      userId: user._id,
      userEmail: user.email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.checkStatus = (req, res, next) => {
  res.status(200).json("ok");
};
