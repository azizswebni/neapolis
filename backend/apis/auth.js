const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../models/user");
// Route POST  api/auth
// desc POST all auth

router.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exists" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Password Incorrect" });
      jwt.sign(
        {
          id: user.id,
        },
        "secretésdfq",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});


router.post("/signUp", (req, res) => {
    const { email, name, password } = req.body;
    console.log("aaa")
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(404).json({ msg: "user already exists" });
      }
      const newUser = new User({
        email,
        name,
        password,
      });
      // create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              {
                id: user.id,
              },
              "secretésdfq",
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    name: user.name,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    });
  });
module.exports = router;