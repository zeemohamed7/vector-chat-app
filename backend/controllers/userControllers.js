
const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel");
const generateToken = require('../config/auth')

const app = express()

// Register user
const registerUser =asyncHandler( async(req, res) => {
    const { name, email, password, profilePicture } = req.body


    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
        profilePicture,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Failed to create user");
      }
      
})

// Login user
const authUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    // Check if matching password
    if (user && (await user.matchPassword(password))) {
        res.json(
{            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.pic,
            token: generateToken(user._id)}
        )
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})
module.exports = { registerUser, authUser };