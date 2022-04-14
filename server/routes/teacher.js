const router = require("express").Router();

const {} = require("../controllers/user");
// const {} = require("../middlewares/validators/");
// const { validationResults } = require("../middlewares/validators/results");
const upload = require("../utilities/uploadImage");

// route
router.post("/", addUserValidator, validationResults, signup);

router.patch(
  "/:id",
  updateUserValidator,
  validationResults,
  upload.single("avatar"),
  updateProfile
);

router.get("/:id", getUserValidator, validationResults, getUser);

router.patch(
  "/change-password/:id",
  changePasswordValidator,
  validationResults,
  changePassword
);

router.post("/signup-with-google", signupWithGoogle);

module.exports = router;
