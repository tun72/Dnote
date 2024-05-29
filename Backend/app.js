const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
// dot env config
const dotenv = require("dotenv");
dotenv.config();

// csrf token set up
// const csrf = require("csurf");
// const csrfProtect = csrf();
const path = require("path");

// routers
const noteRouter = require("./routes/noteRoutes");
const authRouter = require("./routes/authRoutes");

// controller
const errorController = require("./controllers/errorController");

const app = express();
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "100mb" }));

// multer
const configureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fildFilterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: configureStorage, fileFilter: fildFilterConfigure }).single(
    "imgUrl"
  )
);

// csrf setup
// app.use(csrfProtect);
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// router
app.use("/notes", noteRouter);
app.use("/auth", authRouter);
// for 404 routes
app.all("*", errorController.renderRouteNotFound);

// to handel errors
app.use(errorController.renderErrorResponse);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    console.log("database successfully connected ✅");
    app.listen(PORT, () => {
      console.log("Server is running at http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));
