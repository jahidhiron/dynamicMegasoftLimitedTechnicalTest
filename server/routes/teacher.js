const router = require("express").Router();

const {
  getTeachers,
  searchTeacher,
  banTeacher,
} = require("../controllers/teacher");
const isAuthentication = require("../middlewares/auth/index");
const { banTeacherValidator } = require("../middlewares/validators/teacher");
const { validationResults } = require("../middlewares/validators/results");

// route
router.get("/", isAuthentication, getTeachers);

router.get("/search", isAuthentication, searchTeacher);

router.patch(
  "/banned/:id",
  isAuthentication,
  banTeacherValidator,
  validationResults,
  banTeacher
);

module.exports = router;
