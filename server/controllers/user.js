const bcrypt = require("bcryptjs");
const fs = require("fs");

const User = require("../models/User");
const tokenGenaration = require("../utilities/tokenGenaration");
const uniqueId = require("../utilities/generateUniqueId");
const { createLog } = require("../utilities/log");

// add new user
const signup = async (req, res) => {
  const { name, email, password, accountType } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: accountType,
    });

    const data = tokenGenaration(newUser);

    await createLog(
      newUser._id,
      "Create user",
      `Sign up successfulll by ${name} as role ${accountType}`
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// update proffile first time
const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      presentAddress,
      permanentAddress,
      city,
      country,
    } = req.body;
    const { file, protocol } = req;
    const { id: _id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    if (user.isFirstLogin) {
      let url = "";
      if (file) {
        url =
          protocol +
          "://" +
          req.get("host") +
          "/static/" +
          process.env.FOLDER +
          "/" +
          file.filename;
      }

      user.url = file ? url : user.url;
      user.isFirstLogin = false;
      user.userId = await uniqueId();

      await createLog(
        _id,
        "Update profile first time",
        `Update profile first time successfulll by ${user.name} as role ${user.role}`
      );
    } else {
      if (file) {
        const pathName = user.url.replace(
          "http://localhost:8080/static",
          "public"
        );
        // delete main storage
        fs.unlink(pathName, function (err) {
          if (err) throw err;
        });

        url =
          protocol +
          "://" +
          req.get("host") +
          "/static/" +
          process.env.FOLDER +
          "/" +
          file.filename;

        await createLog(
          _id,
          "Update Profle picture",
          `Update Profle picture successfulll by ${user.name} as role ${user.role}`
        );
      }

      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      user.url = file ? url : user.url;
    }

    user.phone = phone ? phone : user.phone;
    user.presentAddress = presentAddress ? presentAddress : user.presentAddress;
    user.permanentAddress = permanentAddress
      ? permanentAddress
      : user.permanentAddress;
    user.city = city ? city : user.city;
    user.country = country ? country : user.country;

    await user.save();
    const data = tokenGenaration(user);

    await createLog(
      _id,
      "Update profile",
      `Update profile successfulll by ${user.name} as role ${user.role}`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// get single user
const getUser = async (req, res) => {
  try {
    const { id: _id } = req.params;

    const user = await User.findById(_id).select("-password, -__v");
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// google signup
const signupWithGoogle = async (req, res) => {
  const { email, googleId, name, imageUrl } = req.body;

  try {
    let dataValues = await User.findOne({ email });
    let data = null;

    if (!dataValues) {
      const newUser = await User.create({
        googleId,
        email,
        role: "user",
        name,
        avatar: imageUrl,
      });

      data = tokenGenaration(newUser);
      await createLog(
        _id,
        "Signup with google",
        `Signup with google successfulll by ${dataValues.name}`
      );
      return res.status(201).json(data);
    } else {
      data = tokenGenaration(dataValues);

      await createLog(
        _id,
        "Signin with google",
        `Signin with google successfulll by ${dataValues.name}`
      );
      return res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id: _id } = req.params;

    let user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrectPassword) {
      return res.status(404).json({ message: "Incorrect password!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    await createLog(
      _id,
      "Change password",
      `Password change successfulll by ${user.name} as role ${user.role}`
    );

    return res.status(200).json({ message: "Password changed successfull!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  signup,
  updateProfile,
  signupWithGoogle,
  getUser,
  changePassword,
};
