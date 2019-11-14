const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(401).json({ message: "Missing user data" });
  } else if (!req.body.username) {
    res.status(401).json({ message: "Missing required username" });
  } else if (!req.body.password) {
    res.status(401).json({ message: "Missing required password" });
  } else {
    next();
  }
}
const validateDepartment = (req, res, next) => {
  if(!req.body.department){
    res.status(401).json({ message: "Missing required department" });
  } else {
    next();
  }
}

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
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

module.exports = {
  restricted,
  validateUser,
  validateDepartment
};