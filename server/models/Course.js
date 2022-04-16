const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, require: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
