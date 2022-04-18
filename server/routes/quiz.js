const router = require("express").Router();

const isAuthentication = require("../middlewares/auth/index");
const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizs,
  getQuiz,
} = require("../controllers/quiz");
const {
  addQuizValidator,
  updateQuizValidator,
  deleteQuizValidator,
  getQuizValidator,
} = require("../middlewares/validators/quiz");
const { validationResults } = require("../middlewares/validators/results");

// route
router.post(
  "/",
  isAuthentication,
  addQuizValidator,
  validationResults,
  createQuiz
);

router.patch(
  "/:id",
  isAuthentication,
  updateQuizValidator,
  validationResults,
  updateQuiz
);

router.delete(
  "/:id",
  isAuthentication,
  deleteQuizValidator,
  validationResults,
  deleteQuiz
);

router.get("/", isAuthentication, getQuizs);

router.get(
  "/:id",
  isAuthentication,
  getQuizValidator,
  validationResults,
  getQuiz
);

module.exports = router;
