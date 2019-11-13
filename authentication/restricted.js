const jwt = require("jsonwebtoken");

const verifyPermissions = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "Shhhh", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Bad token: " + err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No Creds Provided" });
  }
};

module.exports = verifyPermissions;
