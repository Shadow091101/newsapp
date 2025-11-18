const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'betterplaybloodbourne345'
const fetchUser = require('../middleware/fetchuser');


router.post('/signup', [
  body('username', 'Enter a valid username,unique and minimum 5 and maximum 20 characters').isLength({ min: 5, max: 20 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a password with minimum 5 character and maximum 15 characters').isLength({ min: 5, max: 20 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);

  try {
    let success = true;
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      success = false
      return res.status(400).json({ success, error: "Sorry a User with this email already exist" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      username: req.body.username,
      password: secPass,
      email: req.body.email
    });
    const data = {
      id: user.id
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    console.log(authtoken)
    res.json({ success, user })
    console.log("User Created : ", user)
  } catch (error) {
    success = false;
    console.error(error.message);
    res.status(500).json({ success, message: "Some Internal error occured" });
  }
})

router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5, max: 20 }),
  ], async (req, res) => {
    // console.log("req body : ", req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log("Hello : ")
    try {
      let success = false;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Sorry User with this email doesn't exists. Please login with another account or Go Sign In" })
      }
      const passCompare = await bcrypt.compare(password, user.password)
      if (!passCompare) {
        success = false;
        return res.status(400).json({ success, error: "Incorrect Email or Password" })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      console.log('Auth token : ', authtoken)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error occured")
    }
  }
);

router.post('/user', fetchUser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error occured")
  }
})
// Example route
// router.get("/", (req, res) => {
//   res.send("Auth route working!");
// });

module.exports = router;   // <-- IMPORTANT
