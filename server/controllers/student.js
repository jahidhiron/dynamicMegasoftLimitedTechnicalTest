const User = require("../models/User");

// get all students
const getStudents = async (req, res) => {
  try {
    const { size, page, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalStudent = await User.countDocuments({ role: "student" });
    const totalPage = Math.ceil(totalStudent / limit);

    let query = { role: "student" };

    if (search !== "undefined") {
      let regex = new RegExp(search, "i");
      query = {
        ...query,
        $or: [
          { userId: regex },
          { name: regex },
          { phone: regex },
          { email: regex },
          { city: regex },
          { country: regex },
        ],
      };
    }

    const students = await User.find(query)
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .lean();

    const data = {
      students,
      currentPage: Number(pageNum),
      totalPage,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get recent students
const getRecentStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .limit(5)
      .lean();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get unprofile students
const getUnprofileStudents = async (req, res) => {
  try {
    const { size, page, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalStudent = await User.countDocuments({
      role: "student",
      isFirstLogin: true,
    });
    const totalPage = Math.ceil(totalStudent / limit);

    let query = { role: "student", isFirstLogin: true };

    if (search !== "undefined") {
      let regex = new RegExp(search, "i");
      query = {
        ...query,
        $or: [
          { userId: regex },
          { name: regex },
          { phone: regex },
          { email: regex },
          { city: regex },
          { country: regex },
        ],
      };
    }

    const students = await User.find(query)
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .lean();

    const data = {
      students,
      currentPage: Number(pageNum),
      totalPage,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get ban students
const getBanStudents = async (req, res) => {
  try {
    const { size, page, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalStudent = await User.countDocuments({
      role: "student",
      isBan: true,
    });
    const totalPage = Math.ceil(totalStudent / limit);

    let query = { role: "student", isBan: true };

    if (search !== "undefined") {
      let regex = new RegExp(search, "i");
      query = {
        ...query,
        $or: [
          { userId: regex },
          { name: regex },
          { phone: regex },
          { email: regex },
          { city: regex },
          { country: regex },
        ],
      };
    }

    const students = await User.find(query)
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .lean();

    const data = {
      students,
      currentPage: Number(pageNum),
      totalPage,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// search student
const searchStudent = async (req, res) => {
  try {
    const { size, page } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalStudent = await User.countDocuments({ role: "student" });
    const totalPage = Math.ceil(totalStudent / limit);

    const students = await User.find({ role: "student" })
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .skip((pageNum - 1) * limit)
      .limit(limit)
      .lean();

    const data = {
      students,
      currentPage: Number(pageNum),
      totalPage,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// ban student
const banStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const student = await User.findById(_id);
    if (!student) {
      return res.status(404).json({ message: "No student data found!" });
    }

    student.isBan = !student.isBan;
    await student.save();

    res.status(200).json({
      message: `Student has been ${
        student.isBan ? "banned" : "unbanned"
      } successully!`,
      status: student.isBan,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// delete student
const deleteStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;

    User.findByIdAndDelete(_id, (err, docs) => {
      if (err) {
        return res.status(404).json({ message: "No student data found!" });
      } else {
        res.status(200).json({
          message: `Student has been deleted successully!`,
          deleteStatus: true,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// active student
const activeStudent = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const student = await User.findById(_id);
    if (!student) {
      return res.status(404).json({ message: "No student data found!" });
    }

    if (student.status === "active") {
      return res.status(404).json({ message: "Student is already active!" });
    }

    student.status = "active";
    await student.save();

    res.status(200).json({
      message: `Student has been activated successully!`,
      activeStatus: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  getStudents,
  searchStudent,
  banStudent,
  activeStudent,
  deleteStudent,
  getRecentStudents,
  getUnprofileStudents,
  getBanStudents,
};
