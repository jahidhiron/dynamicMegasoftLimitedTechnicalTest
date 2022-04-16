const router = require("express").Router();

const isAuthentication = require("../middlewares/auth/index");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getCourse,
  searchCourses,
} = require("../controllers/course");
const {
  addCourseValidator,
  updateCourseValidator,
  deleteCourseValidator,
  getCourseValidator,
} = require("../middlewares/validators/course");
const { validationResults } = require("../middlewares/validators/results");

// route
router.post(
  "/",
  isAuthentication,
  addCourseValidator,
  validationResults,
  createCourse
);

router.patch(
  "/:id",
  isAuthentication,
  updateCourseValidator,
  validationResults,
  updateCourse
);

router.delete(
  "/:id",
  isAuthentication,
  deleteCourseValidator,
  validationResults,
  deleteCourse
);

router.get("/search", isAuthentication, searchCourses);

router.get("/", isAuthentication, getCourses);

router.get(
  "/:id",
  isAuthentication,
  getCourseValidator,
  validationResults,
  getCourse
);

module.exports = router;
