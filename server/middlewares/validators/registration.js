const { check, param } = require("express-validator");
const createError = require("http-errors");
const mongoose = require("mongoose");

const Registration = require("../../models/Registration");

const addRegistrationValidator = [
  check("name")
    .notEmpty()
    .withMessage("You should provide a valid course name"),

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

const updateRegistrationValidator = [
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

const getRegistrationValidator = [
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
  addRegistrationValidator,
  updateRegistrationValidator,
  getRegistrationValidator,
};
