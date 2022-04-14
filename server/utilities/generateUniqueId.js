const User = require("../models/User");

// generate unique id
const generateUniqueId = () => {
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  let uniqueId = Math.floor(Math.random() * 90000) + 10000 + "";
  let id = year + "-" + uniqueId + "-" + month;
  return id;
};

// check id exist or not
const checkId = async () => {
  const userId = generateUniqueId();
  const existId = await User.findOne({ userId });
  if (existId) {
    checkId();
  }
  return userId;
};

// return unique id
module.exports = () => checkId();
