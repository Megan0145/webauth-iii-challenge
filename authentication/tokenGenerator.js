const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(
    payload,
    process.env.SECRET ? process.env.SECRET : "HardcodedSecret",
    options
  );

  return result;
}

module.exports = generateToken;
