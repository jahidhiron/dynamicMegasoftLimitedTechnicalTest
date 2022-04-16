const bcrypt = require("bcryptjs");

const User = require("../models/User");
const tokenGenaration = require("../utilities/tokenGenaration");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Invalid Credential!" });
    }

    if (existingUser.role === "admin" && existingUser.status === "active") {
      const isCorrectUser = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isCorrectUser) {
        return res.status(404).json({ message: "Invalid Credential!" });
      }

      const data = tokenGenaration(existingUser);

      return res.status(200).json(data);
    } else if (existingUser.isFirstLogin === true) {
      const data = tokenGenaration(existingUser);

      return res.status(200).json(data);
    } else {
      const isCorrectUser = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isCorrectUser) {
        return res.status(404).json({ message: "Invalid Credential!" });
      }

      if (existingUser.status === "inactive") {
        return res.status(404).json({ message: "Your account is inactive!" });
      }
      if (existingUser.isBan === true) {
        return res.status(404).json({
          message:
            "Your account has been banned temporary. Please contact with admin!",
        });
      }

      const data = tokenGenaration(existingUser);

      return res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { login };
