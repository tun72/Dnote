const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader)
    return res.status(401).json({ message: "Not authenticated!" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authenticated!" });

  try {
    const tokenMatch = jwt.verify(token, process.env.SECRECT);
    if (!tokenMatch) {
      return res.status(401).json({ message: "Not authenticated!" });
    }
    req.userId = tokenMatch.userId;
    next();
  } catch (err) {
    next(err);
  }
};
