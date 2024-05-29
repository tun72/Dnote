const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
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

    console.log("Success");
    return res.status(201).json({
      message: "Successfully Login!",
      user,
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
    res.status(422).json({
      message: "Authentication Failed!",
      errors: errors.array(),
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashPassword });

    res.status(201).json({
      message: "Successfully Register!",
      user,
    });
  } catch (err) {
    next(err);
  }
};
