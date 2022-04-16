const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

require("./config/dbConfig")();

const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");
const courseRouter = require("./routes/course");

const ALLOWED_ORIGIN_LIST = [
  process.env.ALLOWED_ORIGIN_1,
  process.env.ALLOWED_ORIGIN_2,
];

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGIN_LIST,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/static", express.static("public"));

app.use("/auth", authRouter);
app.use("/users", userRoute);
app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/courses", courseRouter);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send(err);
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("Success");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`API server is running on port ${PORT}`));
