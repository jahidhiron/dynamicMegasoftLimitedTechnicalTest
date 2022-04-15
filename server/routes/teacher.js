const router = require("express").Router();

const { getTeachers, searchTeacher } = require("../controllers/teacher");
const isAuthentication = require("../middlewares/auth/index");
// const {} = require("../middlewares/validators/");
// const { validationResults } = require("../middlewares/validators/results");

// route
router.get("/", isAuthentication, getTeachers);
router.get("/search", isAuthentication, searchTeacher);

module.exports = router;
