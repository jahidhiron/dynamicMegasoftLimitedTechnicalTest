const router = require("express").Router();

const {
  getTeachers,
  searchTeacher,
  banTeacher,
  deleteTeacher,
  activeTeacher,
  getRecentTeachers,
  getUnprofileTeachers,
  getBanTeachers,
} = require("../controllers/teacher");
const isAuthentication = require("../middlewares/auth/index");
const {
  banTeacherValidator,
  deleteTeacherValidator,
  activeTeacherValidator,
} = require("../middlewares/validators/teacher");
const { validationResults } = require("../middlewares/validators/results");

// route
router.get("/", isAuthentication, getTeachers);

router.get("/search", isAuthentication, searchTeacher);

router.get("/recent-teacher", isAuthentication, getRecentTeachers);

router.get("/unprofile-teacher", isAuthentication, getUnprofileTeachers);

router.get("/ban-teacher", isAuthentication, getBanTeachers);

router.patch(
  "/banned/:id",
  isAuthentication,
  banTeacherValidator,
  validationResults,
  banTeacher
);

router.patch(
  "/active/:id",
  isAuthentication,
  activeTeacherValidator,
  validationResults,
  activeTeacher
);

router.delete(
  "/:id",
  isAuthentication,
  deleteTeacherValidator,
  validationResults,
  deleteTeacher
);

module.exports = router;
