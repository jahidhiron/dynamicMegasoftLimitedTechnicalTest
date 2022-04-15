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
        teacher.isBan ? "banned" : "activated"
      } successully!`,
      status: teacher.isBan,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

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

module.exports = {
  getTeachers,
  searchTeacher,
  banTeacher,
  deleteTeacher,
};
