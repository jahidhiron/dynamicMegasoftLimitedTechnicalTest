const Course = require("../models/Course");
const User = require("../models/User");
const { createLog } = require("../utilities/log");

// add new course
const createCourse = async (req, res) => {
  const { name, description, teacherId } = req.body;

  try {
    const course = await Course.findOne({ name, teacherId });
    if (course) {
      return res.status(404).json({ message: "Course already exist!" });
    }

    const newCourse = new Course({
      name,
      description,
      teacherId,
    });

    await newCourse.save();
    const teacher = await User.findById(teacherId);

    await createLog(
      newCourse.teacherId,
      `Create course`,
      `Course created successfulll by ${teacher.name} as role ${teacher.role}`
    );

    res.status(201).json(newCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// update existing course
const updateCourse = async (req, res) => {
  const { id: _id } = req.params;
  const { name, description } = req.body;
  const { teacherId } = req.query;

  try {
    const course = await Course.findById(_id);
    if (!course) {
      res.status(404).json({ message: "No course data found!" });
    }

    course.name = name ? name : course.name;
    course.description = description ? description : course.description;
    await course.save();

    const teacher = await User.findById(teacherId);

    await createLog(
      teacherId,
      `Update course`,
      `Update course successfulll by ${teacher.name} as role ${teacher.role}`
    );

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// delete existing course
const deleteCourse = async (req, res) => {
  const { id: _id } = req.params;
  const { teacherId } = req.query;

  try {
    Course.findByIdAndDelete(_id, (err, docs) => {
      if (err) {
        return res.status(404).json({ message: "No course data found!" });
      } else {
        res.status(200).json({
          message: `Course has been deleted successully!`,
          deleteStatus: true,
        });
      }
    });

    const teacher = await User.findById(teacherId);

    await createLog(
      teacherId,
      `Delete course`,
      `Delete course successfulll by ${teacher.name} as role ${teacher.role}`
    );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get single course
const getCourse = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const course = await Course.findById(_id);
    if (!course) {
      res.status(404).json({ message: "No course data found!" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get single course
const getCourses = async (req, res) => {
  const { teacherId } = req.query;

  try {
    let courses = [];
    if (teacherId !== "undefined") {
      courses = await Course.find({ teacherId });
    } else {
      courses = await Course.find({});
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// search course
const searchCourses = async (req, res) => {
  try {
    const { search, teacherId } = req.query;
    let query = { teacherId };

    if (search !== "undefined") {
      let regex = new RegExp(search, "i");
      query = {
        ...query,
        $or: [{ name: regex }],
      };
    }

    const courses = await Course.find(query).select("-__v").sort({ _id: -1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getCourses,
  searchCourses,
};
