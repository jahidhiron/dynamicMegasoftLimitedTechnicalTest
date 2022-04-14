const User = require("../models/User");

// get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select(
      "-password, -__v, -googleId, -role, "
    );

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  getTeachers,
};
