// imports
const { validationResult } = require("express-validator");

/* NOTE CONTROLLER */

// get method
exports.getNotes = (req, res, next) => {
  return res.status(200).json({});
};

// post method
exports.postNote = (req, res, next) => {
  const errors = validationResult(req);
  const { title, content } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  return res.status(201).json({
    message: "Note Successfully created ✅",
    data: { title, content },
  });
};
