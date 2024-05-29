const express = require("express");
const { body } = require("express-validator");
const User = require("../models/userModel");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/login")
  .post(
    [
      body("email")
        .trim()
        .isEmail()
        .withMessage("Email is required!")
        .isLength({ min: 5 })
        .withMessage("Email is too short!")
        .isLength({ max: 100 })
        .withMessage("Email is too long!"),

      body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password is too short!")
        .isLength({ max: 20 })
        .withMessage("Password is too long!"),
    ],
    authController.Login
  );

router.route("/register").post(
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required!")
      .isLength({ min: 5 })
      .withMessage("Email is too short!")
      .isLength({ max: 100 })
      .withMessage("Email is too long!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) return Promise.reject("User Already Exist");
        });

        // console.log(user);
        // return user ? true : false;
      })
      .withMessage("User Already Exist"),
    body("username")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Username is too short!")
      .isLength({ max: 30 })
      .withMessage("Username is too long!"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password is too short!")
      .isLength({ max: 20 })
      .withMessage("Password is too long!"),
  ],
  authController.Register
);

module.exports = router;
