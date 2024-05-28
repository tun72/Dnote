const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const noteController = require("../controllers/noteController");

router.route("/all").get(noteController.getNotes);

router
  .route("/create")
  .post(
    [
      body("title")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Title is too short!")
        .isLength({ max: 10 })
        .withMessage("Title is too long!"),
      body("content")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content is too short!")
        .isLength({ max: 100 })
        .withMessage("Content is too long!"),
    ],
    noteController.postNote
  );

module.exports = router;
