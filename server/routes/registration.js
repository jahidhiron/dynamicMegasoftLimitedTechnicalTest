const router = require("express").Router();

const isAuthentication = require("../middlewares/auth/index");
const {
  createRegistration,
  updateRegistration,
  getRegistration,
  getRegistrations,
} = require("../controllers/registration");
const {
  addRegistrationValidator,
  updateRegistrationValidator,
  getRegistrationValidator,
} = require("../middlewares/validators/registration");
const { validationResults } = require("../middlewares/validators/results");

// route
router.post(
  "/",
  isAuthentication,
  addRegistrationValidator,
  validationResults,
  createRegistration
);

router.patch(
  "/:id",
  isAuthentication,
  updateRegistrationValidator,
  validationResults,
  updateRegistration
);

router.get("/", isAuthentication, getRegistrations);

router.get(
  "/:id",
  isAuthentication,
  getRegistrationValidator,
  validationResults,
  getRegistration
);

module.exports = router;
