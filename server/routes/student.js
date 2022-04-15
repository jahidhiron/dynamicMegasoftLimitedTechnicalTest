const router = require("express").Router();

const {
  getStudents,
  searchStudent,
  banStudent,
  deleteStudent,
  activeStudent,
} = require("../controllers/student");
const isAuthentication = require("../middlewares/auth/index");
const {
  banStudentValidator,
  deleteStudentValidator,
  activeStudentValidator,
} = require("../middlewares/validators/student");
const { validationResults } = require("../middlewares/validators/results");

// route
router.get("/", isAuthentication, getStudents);

router.get("/search", isAuthentication, searchStudent);

router.patch(
  "/banned/:id",
  isAuthentication,
  banStudentValidator,
  validationResults,
  banStudent
);

router.patch(
  "/active/:id",
  isAuthentication,
  activeStudentValidator,
  validationResults,
  activeStudent
);

router.delete(
  "/:id",
  isAuthentication,
  deleteStudentValidator,
  validationResults,
  deleteStudent
);

module.exports = router;
