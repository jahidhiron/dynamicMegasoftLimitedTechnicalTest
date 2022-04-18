const Quiz = require("../models/Quiz");

// add new course
const createQuiz = async (req, res) => {
  const { name, description, teacherId, quiz } = req.body;

  try {
    const existQuizName = Quiz.findOne({ name });
    if (existQuizName) {
      return res.status(404).json({ message: "Quiz name already exist!" });
    }
    const newQuiz = await Quiz.create({
      name,
      description,
      teacherId,
      quiz,
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// update existing course
const updateQuiz = async (req, res) => {
  const { id: _id } = req.params;
  const { name, description } = req.body;

  try {
    const course = await Course.findById(_id);
    if (!course) {
      res.status(404).json({ message: "No course data found!" });
    }

    course.name = name ? name : course.name;
    course.description = description ? description : course.description;
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// delete existing course
const deleteQuiz = async (req, res) => {
  const { id: _id } = req.params;

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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get single course
const getQuiz = async (req, res) => {
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
const getQuizs = async (req, res) => {
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

module.exports = {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuiz,
  getQuizs,
};
