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
        .isLength({ max: 30 })
        .withMessage("Title is too long!"),
      body("content")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content is too short!")
        .isLength({ max: 500 })
        .withMessage("Content is too long!"),
    ],
    noteController.postNote
  );

//update note
router
  .route("/:noteId/update")
  .put(
    [
      body("title")
        .isLength({ min: 3 })
        .withMessage("Title is too short!")
        .isLength({ max: 30 })
        .withMessage("Title is too long!"),
      body("content")
        .isLength({ min: 10 })
        .withMessage("Content is too short!")
        .isLength({ max: 500 })
        .withMessage("Content is too long!"),
    ],
    noteController.patchNote
  );

router.route("/:noteId/delete").delete(noteController.deleteNote);

// get single notes
router.route("/:noteId").get(noteController.getSingleNote);
module.exports = router;
