const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("./tokenGenerator");
const {
  restricted,
  validateUser,
  validateDepartment
} = require("../middleware/");

const users = require("../users/users-model");

router.post("/register", validateUser, validateDepartment, (req, res) => {
  const hashedpw = bcrypt.hashSync(req.body.password, 10);
  const newUser = {
    username: req.body.username,
    password: hashedpw,
    department: req.body.department
  };

  users
    .add(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not create new user: " + err.message });
    });
});

router.post("/login", validateUser, (req, res) => {
  const { username, password } = req.body;

  users
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!`, token: token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not login user: " + err.message });
    });
});

router.get("/users", restricted, (req, res) => {
  if (req.decodedToken) {
    users
      .find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({
          message: "Something went wrong retrieving users: " + err.message
        });
      });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized. You must be logged in to view users" });
  }
});

module.exports = router;
