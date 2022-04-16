const { check, param } = require("express-validator");
const createError = require("http-errors");
const mongoose = require("mongoose");

const Course = require("../../models/Course");

const addCourseValidator = [
  check("courseId").notEmpty().withMessage("You should select a valid course"),
  check("teacherId")
    .notEmpty()
    .withMessage("You should select a valid teacher"),
  check("name")
    .notEmpty()
    .withMessage("You should provide a valid course name")
    .trim()
    .custom(async (name) => {
      try {
        const existingCourse = await Course.findOne({ name });
        if (existingCourse) {
          throw createError("Course already exist!");
        }
      } catch (error) {
        throw createError(error);
      }
    }),

  check("description")
    .notEmpty()
    .withMessage("You should provide a valid course name")
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
];

const updateCourseValidator = [
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

const deleteCourseValidator = [
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

const getCourseValidator = [
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
  addCourseValidator,
  updateCourseValidator,
  deleteCourseValidator,
  getCourseValidator,
};
