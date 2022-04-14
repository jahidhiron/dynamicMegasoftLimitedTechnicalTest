const jwt = require("jsonwebtoken");

const tokenGenaration = (user) => {
  const { _id, email, name, url, isFirstLogin } = user;

  const token = jwt.sign(
    { id: _id, email: email },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: _id,
      email,
      name,
      url,
      isFirstLogin,
    },
    token,
  };
};

module.exports = tokenGenaration;
