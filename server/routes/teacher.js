const router = require("express").Router();

const { getTeachers } = require("../controllers/teacher");
const isAuthentication = require("../middlewares/auth/index");
// const {} = require("../middlewares/validators/");
// const { validationResults } = require("../middlewares/validators/results");

// route
router.get("/", isAuthentication, getTeachers);

module.exports = router;
