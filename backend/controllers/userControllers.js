const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/auth");

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  console.log("this is name:" + name);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.pic,
      token: generateToken(user._id),
    });

    user.save();
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

// Login user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(user);
  // Check if matching password
  if (user && (await user.matchPassword(password))) {
    const isMatch = true; // Password matched
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.pic,
      token: generateToken(user._id),
      isMatch: isMatch, // Send the value of isMatch to the response
    });
  } else {
    const isMatch = false; // Password did not match
    res.status(401);
    res.json({
      error: "Invalid Email or Password",
      isMatch: isMatch, // Send the value of isMatch to the response
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search

    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users = await User.find(keyword).find({_id:{$ne: req.user_id}} ) // Except current user, return all user that are part of search result defined in keyword

    res.send(users)
});


module.exports = { registerUser, authUser, allUsers };
