const User = require("../models/User");

// get all teachers
const getTeachers = async (req, res) => {
  try {
    const { size, page } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalTeacher = await User.countDocuments({ role: "teacher" });
    const totalPage = Math.ceil(totalTeacher / limit);

    const teachers = await User.find({ role: "teacher" })
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .lean();

    const data = {
      teachers,
      currentPage: Number(pageNum),
      totalPage,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  getTeachers,
};
