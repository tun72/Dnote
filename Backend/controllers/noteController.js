// imports
const { validationResult } = require("express-validator");
const Note = require("../models/notesModel");
const fileDelete = require("../utils/fileDelete");
/* NOTE CONTROLLER */

// get method
exports.getNotes = async (req, res, next) => {
  const LIMIT = 6;
  const currentPage = +req.query.page || 1;
  const totalNotes = await Note.countDocuments();
  // 1 - 1 * 6 = 0
  // 2 - 1 * 6 = 6
  // 3 - 1 * 6 = 12

  try {
    const notes = await Note.find()
      .skip((currentPage - 1) * LIMIT)
      .limit(LIMIT);

    return res.status(200).json({
      message: "Success",
      notes,
      nextPage: LIMIT * currentPage < totalNotes,
      prevPage: currentPage > 1,
    });
  } catch (err) {
    next(err);
  }
};

// get single note
exports.getSingleNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId).populate("userId", "username email");

  return res.status(200).json({
    message: "Success",
    note,
  });
};

// post method
exports.postNote = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;

  const image = req.file;

  // if (!image) {
  //   return res.status(422).json({
  //     message: "Validation Failed Error Image",
  //     errors: errors.array(),
  //   });
  // }
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  try {
    const note = await Note.create({
      title,
      content,
      imgUrl: image?.path ?? "",
      userId: req.userId,
    });

    return res.status(201).json({
      message: "Note Successfully created ✅",
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

// edit notes
exports.patchNote = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, content } = req.body;

  const image = req.file;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  try {
    let updateData = {
      title,
      content,
    };

    if (image) {
      updateData = { ...updateData, imgUrl: image.path };
    }

    const note = await Note.findByIdAndUpdate(noteId, updateData);

    if (image) {
      fileDelete(note.imgUrl);
    }

    return res.status(201).json({
      message: "Note Successfully updated ✅",
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

// delete notes
exports.deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findByIdAndDelete(noteId);

    if (!note)
      return res.status(404).json({
        message: "Error No Note found!",
      });

    fileDelete(note.imgUrl);

    return res.status(204).json({
      message: "Note Successfully updated ✅",
      data: note,
    });
  } catch (err) {
    const error = new Error("Note Deleting Failed");
    return next(error);
  }
};
