const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const protect = asyncHandler(async (req, res, next) => { //Middle ware so it needs next
    let token; 
  
    // If there is something in header and it is a bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Bearer TOKEN
        // Remove bearer and take token
        token = req.headers.authorization.split(" ")[1];
  
        //decodes token id and verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // Find user in DB and return without the password
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    // If there is no token
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
  
  module.exports = { protect };