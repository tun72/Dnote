const jwt = require("jsonwebtoken");
const Note = require("../models/notesModel");
require("dotenv").config();
exports.isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "Not authenticated!" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const tokenMatch = jwt.verify(token, process.env.SECRECT);
    console.log(tokenMatch);
    if (!tokenMatch) {
      return res.status(401).json({ message: "Not authenticated!" });
    }
    req.userId = tokenMatch.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated." });
  }
};

exports.isOwner = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);

    console.log(note + "Dwdwd");
    if (!note)
      return res.status(401).json({
        message: "Auth Failed",
      });

    if (req.userId !== note.userId.toString())
      return res.status(401).json({
        message: "Auth Failed",
      });

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
