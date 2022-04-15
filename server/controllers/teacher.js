const User = require("../models/User");

// get all teachers
const getTeachers = async (req, res) => {
  try {
    const { size, page, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalTeacher = await User.countDocuments({ role: "teacher" });
    const totalPage = Math.ceil(totalTeacher / limit);

    let query = { role: "teacher" };

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

    const teachers = await User.find(query)
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

// get recent teacher
const getRecentTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" })
      .select("-password, -__v, -googleId, -role, ")
      .sort({ _id: -1 })
      .limit(5)
      .lean();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get unprofile teachers
const getUnprofileTeachers = async (req, res) => {
  try {
    const { size, page, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalTeacher = await User.countDocuments({
      role: "teacher",
      isFirstLogin: true,
    });
    const totalPage = Math.ceil(totalTeacher / limit);

    let query = { role: "teacher", isFirstLogin: true };

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

    const teachers = await User.find(query)
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

// get ban teachers
const getBanTeachers = async (req, res) => {
  try {
    const { size, page, search } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(size) || 10;

    const totalTeacher = await User.countDocuments({
      role: "teacher",
      isBan: true,
    });
    const totalPage = Math.ceil(totalTeacher / limit);

    let query = { role: "teacher", isBan: true };

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

    const teachers = await User.find(query)
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

// search teacher
const searchTeacher = async (req, res) => {
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

// ban teacher
const banTeacher = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const teacher = await User.findById(_id);
    if (!teacher) {
      return res.status(404).json({ message: "No teacher data found!" });
    }

    teacher.isBan = !teacher.isBan;
    await teacher.save();

    res.status(200).json({
      message: `Teacher has been ${
        teacher.isBan ? "banned" : "unbanned"
      } successully!`,
      status: teacher.isBan,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id: _id } = req.params;

    User.findByIdAndDelete(_id, (err, docs) => {
      if (err) {
        return res.status(404).json({ message: "No teacher data found!" });
      } else {
        res.status(200).json({
          message: `Teacher has been deleted successully!`,
          deleteStatus: true,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// active teacher
const activeTeacher = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const teacher = await User.findById(_id);
    if (!teacher) {
      return res.status(404).json({ message: "No teacher data found!" });
    }

    if (teacher.status === "active") {
      return res.status(404).json({ message: "Teacher is already active!" });
    }

    teacher.status = "active";
    await teacher.save();

    res.status(200).json({
      message: `Teacher has been activated successully!`,
      activeStatus: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  getTeachers,
  searchTeacher,
  banTeacher,
  activeTeacher,
  deleteTeacher,
  getRecentTeachers,
  getUnprofileTeachers,
  getBanTeachers,
};
