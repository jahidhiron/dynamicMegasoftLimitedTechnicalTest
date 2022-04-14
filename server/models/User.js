const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, default: "" },
  password: { type: String },
  googleId: { type: String },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "student",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  phone: { type: String, default: "" },
  presentAddress: { type: String, default: "" },
  permanentAddress: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  url: { type: String, default: "" },
  isBan: { type: Boolean, default: false },
  isFirstLogin: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", userSchema);
