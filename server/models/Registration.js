const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, require: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("registration", registrationSchema);
