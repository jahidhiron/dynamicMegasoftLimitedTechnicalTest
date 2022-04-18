const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, require: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    quiz: [
      {
        question: { type: String, require: true },
        choice: [
          {
            firstChoice: { type: String, required: true },
            answer: { type: Boolean, required: true },
          },
          {
            secondChoice: { type: String, required: true },
            answer: { type: Boolean, required: true },
          },
          {
            thirdChoice: { type: String },
            answer: { type: Boolean },
          },
          {
            fourthChoice: { type: String },
            answer: { type: Boolean },
          },
          {
            fifthChoice: { type: String },
            answer: { type: Boolean },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("quiz", quizSchema);
