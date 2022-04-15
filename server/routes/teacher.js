const router = require("express").Router();

const {
  getTeachers,
  searchTeacher,
  banTeacher,
  deleteTeacher,
} = require("../controllers/teacher");
const isAuthentication = require("../middlewares/auth/index");
const {
  banTeacherValidator,
  deleteTeacherValidator,
} = require("../middlewares/validators/teacher");
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

router.delete(
  "/:id",
  isAuthentication,
  deleteTeacherValidator,
  validationResults,
  deleteTeacher
);

module.exports = router;
