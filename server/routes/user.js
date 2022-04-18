const router = require("express").Router();

const {
  signup,
  updateProfile,
  getUser,
  changePassword,
  signupWithGoogle,
  getActivityLog,
} = require("../controllers/user");
const {
  addUserValidator,
  updateUserValidator,
  getUserValidator,
  changePasswordValidator,
} = require("../middlewares/validators/user");
const isAuthentication = require("../middlewares/auth/index");
const { validationResults } = require("../middlewares/validators/results");
const upload = require("../utilities/uploadImage");

// route
router.post("/", addUserValidator, validationResults, signup);

router.patch(
  "/:id",
  isAuthentication,
  updateUserValidator,
  validationResults,
  upload.single("avatar"),
  updateProfile
);

router.get(
  "/:id",
  isAuthentication,
  getUserValidator,
  validationResults,
  getUser
);

router.patch(
  "/change-password/:id",
  isAuthentication,
  changePasswordValidator,
  validationResults,
  changePassword
);

router.get("/activity-log/:id", isAuthentication, getActivityLog);

router.post("/signup-with-google", signupWithGoogle);

module.exports = router;
