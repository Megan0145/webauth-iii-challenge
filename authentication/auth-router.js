const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../users/users-model");

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  users
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not login user: " + err.message });
    });
});

module.exports = router;
