const { param } = require("express-validator");
const createError = require("http-errors");
const mongoose = require("mongoose");

const banTeacherValidator = [
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

const deleteTeacherValidator = [
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

const activeTeacherValidator = [
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
  banTeacherValidator,
  deleteTeacherValidator,
  activeTeacherValidator,
};
