const { check, param } = require("express-validator");
const createError = require("http-errors");
const mongoose = require("mongoose");

const Course = require("../../models/Course");

const addQuizValidator = [
  check("name")
    .notEmpty()
    .withMessage("You should provide a valid quiz name")
    .trim(),

  check("description")
    .notEmpty()
    .withMessage("You should provide a valid quiz description")
    .trim()
    .custom(async (description) => {
      try {
        if (description.length < 20) {
          throw createError("Course description must be 20 char long!");
        }
      } catch (error) {
        throw createError(error);
      }
    }),

  check("quiz").custom(async (quiz) => {
    quiz.map((q) => {
      if (!q.question) {
        throw createError("You should provide a valid quiz question!");
      }
      q.choice.map((c, i) => {
        if (!c.firstChoice) {
          throw createError("You have to fillup first choice!");
        }
        if (!c.firstChoice && (i === 1 || i === 2)) {
          throw createError(
            "You have to fillup first and second choice answer!"
          );
        }
      });
    });
    try {
      if (description.length < 20) {
        throw createError("Course description must be 20 char long!");
      }
    } catch (error) {
      throw createError(error);
    }
  }),
];

const updateQuizValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No user found!" });
      }
    } catch (error) {
      throw createError(error);
    }
  }),

  check("name").custom(async (name) => {
    try {
      const existingCourse = await Course.findOne({ name });
      if (existingCourse) {
        throw createError("Course already exist!");
      }

      if (name && name.length < 3) {
        throw createError("Course name is too short. It must be 3 chart long!");
      }
    } catch (error) {
      throw createError(error);
    }
  }),

  check("description").custom(async (description) => {
    try {
      if (description && description.length < 20) {
        throw createError("Course name is too short, it must be 20 char long!");
      }
    } catch (error) {
      throw createError(error);
    }
  }),
];

const deleteQuizValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No user found!" });
      }
    } catch (error) {
      throw createError(error);
    }
  }),
];

const getQuizValidator = [
  param("id").custom(async (id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No user found!" });
      }
    } catch (error) {
      throw createError(error);
    }
  }),
];

module.exports = {
  addQuizValidator,
  updateQuizValidator,
  deleteQuizValidator,
  getQuizValidator,
};
