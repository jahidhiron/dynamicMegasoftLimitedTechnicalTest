const Registration = require("../models/Registration");
const User = require("../models/User");
const { createLog } = require("../utilities/log");
const generateDateAndTime = require("../utilities/generateCurrentDateTime");

// add new registration
const createRegistration = async (req, res) => {
  const { name, description, teacherId, studentId } = req.body;

  const existingCourse = await Registration.findOne({ name, studentId });
  if (existingCourse) {
    throw createError("Course already exist!");
  }

  try {
    const newRegistration = await Registration.create({
      name,
      description,
      teacherId,
      studentId,
    });

    const student = await User.findById(studentId);

    await createLog(
      student,
      `Course registration`,
      `Course registration successfulll by ${student.name} as role ${
        student.role
      } at ${generateDateAndTime()}`
    );

    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// update existing registration
const updateRegistration = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const registration = await Registration.findById(_id);
    if (!registration) {
      res.status(404).json({ message: "No registration data found!" });
    }

    registration.active = true;
    await registration.save();

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get single registration
const getRegistration = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const registration = await Registration.findById(_id);
    if (!registration) {
      res.status(404).json({ message: "No registration data found!" });
    }

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get all registration
const getRegistrations = async (req, res) => {
  const { teacherId, studentId } = req.query;

  try {
    let registrations = [];
    if (studentId) {
      registrations = await Registration.find({
        studentId,
      }).populate("teacherId");
    } else {
      registrations = await Registration.find({
        teacherId,
      }).populate("studentId");
    }

    res.status(201).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  createRegistration,
  updateRegistration,
  getRegistration,
  getRegistrations,
};
