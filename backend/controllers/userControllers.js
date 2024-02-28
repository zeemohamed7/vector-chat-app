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
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.json({
      error: "Invalid Email or Password",
    });
  }
});

module.exports = { registerUser, authUser };
